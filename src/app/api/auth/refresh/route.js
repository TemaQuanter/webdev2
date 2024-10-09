/*
    This file contains the logic for handling refresh tokens in the application.
*/

import jwt from 'jsonwebtoken'

const handler = (req, res) => {
  // Retrieve the refresh token from cookies.
  const refreshToken = req.cookies.refreshToken

  // If refresh token was not found in cookies, then it is impossible
  // to authorize a user this way.
  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' })
  } // end if

  // The refresh token was found in the cookies.
  // Verify the validity of the refresh token.
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    // If the refresh token is invalid, then the user cannot be authorized this way.
    if (err) {
      return res.status(403).json({ message: 'Forbidden' })
    } // end if

    // Otherwise, the refresh token is valid and it is feasible to grand a user
    // with an access token.
    //
    // Generate a new access token.
    const newAccessToken = jwt.sign(
      { userId: user.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    )

    // Update the refresh token.
    // It is necessary to rotate refresh tokens for enhanced security.
    const newRefreshToken = jwt.sign(
      { userId: user.userId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    )

    // Send the new tokens to the client.
    // Store refresh token in cookies for enhanced security.
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${newRefreshToken}; HttpOnly; Path=/; Secure;`
    )

    // Send an access token in JSON format.
    res.json({ accessToken: newAccessToken })
  })
} // end function handler

export default handler
