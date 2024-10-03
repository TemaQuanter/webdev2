import Header from './components/Header.jsx'
import SideMenu from './components/SideMenu.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css' // Adjust the path if necessary

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <SideMenu />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
