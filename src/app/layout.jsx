import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css' // Adjust the path if necessary

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
