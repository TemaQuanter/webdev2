'use client'

import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'

import ProductCard from '@/components/ProductCard'
import ButtonBack from '@/components/ButtonBack'

const Sales = () => {
  const [isHovered, setIsHovered] = useState(false)

  // Sales history.
  const [salesHistory, setSalesHistory] = useState([])
  const [salesDates, setSalesDates] = useState([])

  // User information.
  const [userName, setUserName] = useState('') // Store user's name here

  // An error indicator.
  const [error, setError] = useState(null)

  // Load the sales history.
  useEffect(() => {
    console.log('useEffect started...')

    // This function calls an API to load the history of sales.
    const handleLoadSalesHistory = async () => {
      try {
        // Make an API call to load the history of sales.
        const response = await fetch('/api/db/get_sales_history', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        // Check if the request was successful.
        if (response.ok) {
          // Load the requested data.
          const data = await response.json()

          // Sort the items by purchase date.
          data.sort(
            (a, b) => new Date(b.purchase_date) - new Date(a.purchase_date)
          )

          console.log(data)

          // Get the user's name from the data (assuming it's included)
          if (data.length > 0) {
            const { first_name, last_name } =
              data[0].users_purchases_seller_idTousers // Modify as per your data structure
            setUserName(`${first_name} ${last_name}`)
          }

          // Get all sales dates in a sorted order.
          let sDates = []

          data.map((item, index) => {
            if (index === 0) {
              sDates.push(item.purchase_date)
            } else if (sDates[sDates.length - 1] !== item.purchase_date) {
              sDates.push(item.purchase_date)
            } // end if
          }) // end map

          // Set the sales dates.
          setSalesDates(sDates)

          // Set the sales history.
          setSalesHistory(data)

          console.log(data)
          console.log(sDates)
        } else {
          // An error occurred while making a request.
          const errorData = await response.json()
          console.log(errorData.message)
          setError(errorData.message)
        }
      } catch (err) {
        console.log(err)
        setError(err)
      }
    }

    handleLoadSalesHistory()
  }, []) // end useEffect

  return (
    <div className="min-h-screen bg-gray-100 d-flex flex-column justify-content-center align-items-center">
      {/* Sales Dashboard Section with Gradient and Fade-in Animation */}
      <Container
        fluid
        className="sales-dashboard-section text-white py-5"
        style={{
          background: 'linear-gradient(90deg, #d3d3d3, #8bcbff)',
          animation: 'fadeIn 2s ease-in-out'
        }}
      >
        <h1 className="text-center">
          Sales Overview - {userName ? userName : 'Valued User'}
        </h1>
      </Container>

      <div>
        <ButtonBack href="/account/sales" />

        <Container>
          <p className="text-left fs-5 fw-bolder" style={{ marginTop: '2rem' }}>
            Sales History
          </p>
        </Container>
        <hr />
      </div>

      {/* Container for product cards */}
      <Container fluid className="my-4" style={{ padding: '0 15px' }}>
        <div
          className="mx-auto d-flex flex-column"
          style={{ maxWidth: '85%', gap: '5rem' }}
        >
          {salesDates &&
            salesHistory &&
            salesDates.map((salesDate, index) => (
              <div className="d-flex flex-column" style={{ gap: '1rem' }}>
                <p className="fw=lighter text-center">
                  {new Date(salesDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
                {salesHistory
                  .filter((sale) => {
                    return sale.purchase_date === salesDate
                  })
                  .map((filteredSale, idx) => {
                    const imageUrl = filteredSale.image_url.replace(
                      'public/',
                      '/'
                    )

                    return (
                      <div>
                        <ProductCard
                          title={filteredSale.title}
                          description={filteredSale.description}
                          imageUrl={`/api/db/get_public_image?${new URLSearchParams({ imagePath: filteredSale.image_url })}`}
                          sellerName={`${filteredSale.users_purchases_seller_idTousers.first_name} ${filteredSale.users_purchases_seller_idTousers.last_name}`}
                          price={filteredSale.price}
                        />
                        <p className="fs-4 text-center">
                          x{filteredSale.number_of_items}
                        </p>
                      </div>
                    )
                  })}
              </div>
            ))}
        </div>
      </Container>

      {/* Keyframes for fade-in effect */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default Sales
