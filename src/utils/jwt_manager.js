/*
    This file contains logic for JWT management.
*/

import { SignJWT, jwtVerify } from 'jose'

export const TYPE_ACCESS_TOKEN = 'ACCESS_TOKEN'
export const TYPE_REFRESH_TOKEN = 'REFRESH_TOKEN'

const ACCESS_TOKEN_EXPIRATION_TIME = '15m'
const REFRESH_TOKEN_EXPIRATION_TIME = '7d'

// This function creates a JWT token and returns it.
export const createJWT = async (tokenType, userId) => {
  // Decide what secret to use for encoding.
  const jwtSecret =
    tokenType === TYPE_ACCESS_TOKEN
      ? process.env.REFRESH_TOKEN_SECRET
      : process.env.ACCESS_TOKEN_SECRET

  // Get token expiration time.
  const expirationTime =
    tokenType === TYPE_ACCESS_TOKEN
      ? ACCESS_TOKEN_EXPIRATION_TIME
      : REFRESH_TOKEN_EXPIRATION_TIME

  // A secret to use for JWT creation.
  const encodedSecret = new TextEncoder().encode(jwtSecret)

  // Create a JWt.
  const jwt = await new SignJWT({ userId: userId })
    .setProtectedHeader({ alg: 'HS256' }) // algorithm header
    .setIssuedAt() // iat
    .setExpirationTime(expirationTime) // expiration
    .sign(encodedSecret) // signing with the secret key

  console.log(`Token type: ${tokenType} JWT: ${jwt}`)

  return jwt
} // end function createJWT

// This function verifies the JWT and returns the payload.
// The function returns payload, if the token is valid, or null
// if the token is invalid or expired.
export const verifyJWT = async (tokenType, token) => {
  // Get the secret for token verification.
  const jwtSecret =
    tokenType === TYPE_ACCESS_TOKEN
      ? process.env.REFRESH_TOKEN_SECRET
      : process.env.ACCESS_TOKEN_SECRET

  // A secret to use for JWT verification.
  const encodedSecret = new TextEncoder().encode(jwtSecret)

  // Try to decode and verify the token.
  try {
    // Verify the token and decode it.
    const { payload, protectedHeader } = await jwtVerify(token, encodedSecret)

    console.log('JWT verification succeeded: ', payload)

    // Return the decoded payload.
    return payload
  } catch (err) {
    // Token verification failed.
    // Toke invalid.
    console.log('Token verification failed:', err)

    // Return null, since the token verification failed.
    return null
  } // end try-catch
} // end function verifyJWT
