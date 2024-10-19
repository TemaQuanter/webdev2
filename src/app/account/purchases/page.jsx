'use client'

import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'

import ProductCard from '@/components/ProductCard'
import ButtonBack from '@/components/ButtonBack'

const Purchases = () => {
  const [isHovered, setIsHovered] = useState(false)

  // Sales history.
  const [salesHistory, setSalesHistory] = useState([])
  const [salesDates, setSalesDates] = useState([])

  // An error indicator.
  const [error, setError] = useState(null)

  // Load the sales history.
  useEffect(() => {
    console.log('useEffect started...')

    // This function calls an API to load the history of sales.
    const handleLoadSalesHistory = async () => {
      try {
        // Make an API call to load the history of sales.
        const response = await fetch('/api/db/get_purchases_history', {
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
            (a, b) => new Date(a.purchase_date) - new Date(b.purchase_date)
          )

          // Get all sales dates in a sorted order.
          let sDates = []

          data.map((item, index) => {
            // Check if this sales date was already recorded.
            if (index === 0) {
              sDates.push(item.purchase_date)
            } else if (sDates[sDates.length - 1] !== item.purchase_date) {
              sDates.push(item.purchase_date)
            }
          })

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
      {/* Purchases Dashboard Section with Gradient and Fade-in Animation */}
      <Container
        fluid
        className="purchases-dashboard-section text-white py-5"
        style={{
          background: 'linear-gradient(90deg, #d3d3d3, #8bcbff)',
          animation: 'fadeIn 2s ease-in-out'
        }}
      >
        <h1 className="text-center">Purchases Dashboard</h1>
      </Container>

      <ButtonBack href="/account/sales" />

      <div>
        <Container>
          <p className="text-left fs-5 fw-bolder" style={{ marginTop: '2rem' }}>
            Purchases
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
                    // Get a proper image URL.
                    const imageUrl = filteredSale.products.image_url.replace(
                      'public/',
                      '/'
                    )

                    return (
                      <div>
                        <ProductCard
                          title={filteredSale.products.title}
                          description={filteredSale.products.description}
                          imageUrl={imageUrl}
                          sellerName={`${filteredSale.products.users.first_name} ${filteredSale.products.users.last_name}`}
                          price={filteredSale.products.price}
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

export default Purchases
