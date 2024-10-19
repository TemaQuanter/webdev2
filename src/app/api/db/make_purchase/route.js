/*
    This file contains a logic for making a purchase.
*/

import { INTERNAL_SERVER_ERROR } from '@/constants'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  console.log('make_purchase api triggered')

  // Get access token from the cookies.
  const accessToken = req.cookies.get('accessToken')

  // Try to decrypt and verify the access token.
  const decoded = await verifyJWT(TYPE_ACCESS_TOKEN, accessToken.value)

  // Display the decoded access token.
  console.log(decoded)

  // Check if the access token is valid.
  if (decoded === null) {
    // The decoded token is invalid.
    // Send a not authorized response to the client.
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  } // end try-catch

  // Get the user ID from the token.
  const userId = decoded.userId

  // Establish a connection with the database.
  const prisma = new PrismaClient()

  // Try to make a purchase.
  try {
    // Make a transaction that will handle the entire purchasing process.
    await prisma.$transaction(async (prisma) => {
      // Retrieve all purchasing information from the user's cart.
      const cart = await prisma.cart.findMany({
        where: {
          user_id: userId
        },
        select: {
          products: {
            select: {
              title: true,
              number_of_items: true,
              price: true,
              seller_id: true
            }
          },
          product_id: true,
          number_of_items: true
        }
      })

      // Get the buyer information.
      const buyer = await prisma.users.findUnique({
        where: {
          user_id: userId
        }
      })

      // Calculate the total price of all products.
      let totalPrice = 0

      // Calculate the total price of all purchases.
      for (const item of cart) {
        // Check that there are enough products to meet the user demand.
        if (
          Number(item.products.number_of_items) < Number(item.number_of_items)
        ) {
          // There are not enough products on the stock.
          throw new Error(
            `Not enough products on the stock: ${item.products.title}`
          )
        } // end if

        // Subtract the number of available products in the database.
        await prisma.products.update({
          where: {
            product_id: Number(item.product_id)
          },
          data: {
            number_of_items:
              Number(item.products.number_of_items) -
              Number(item.number_of_items)
          }
        })

        totalPrice += Number(item.products.price) * Number(item.number_of_items)

        // Check if the current total price is higher than buyer balance,
        // then reject the transaction.
        if (totalPrice > Number(buyer.balance)) {
          throw new Error('Insufficient balance')
        } // end if

        // Add the purchase to the purchase history.
        await prisma.purchases.create({
          data: {
            users_purchases_buyer_idTousers: {
              connect: {
                user_id: userId
              }
            },
            users_purchases_seller_idTousers: {
              connect: {
                user_id: Number(item.products.seller_id)
              }
            },
            product_id: Number(item.product_id),
            number_of_items: Number(item.number_of_items)
          }
        })
      } // end for

      // Subtract the user balance.
      await prisma.users.update({
        where: {
          user_id: userId
        },
        data: {
          balance: Number(buyer.balance) - totalPrice
        }
      })

      // Clear the user cart.
      await prisma.cart.delete({
        where: {
          user_id: userId
        }
      })
    }) // end transaction

    console.log('Purchase succeeded')
  } catch (err) {
    // Log the error.
    console.log(err)

    // Return a general server error.
    return NextResponse.json(
      { message: INTERNAL_SERVER_ERROR },
      { status: 500 }
    )
  } finally {
    // Disconnect from the database.
    await prisma.$disconnect()
  } // end try-catch

  // Return the user.
  return NextResponse.json(user, { status: 200 })
} // end function POST
