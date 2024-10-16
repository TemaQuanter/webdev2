'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

const DeliveryPage = () => {
  useEffect(() => {
    // Define the initMap function globally by assigning it to the window object
    window.initMap = function () {
      const location = { lat: 53.3511, lng: -6.2786 }
      // Example: Dublin coordinates

      // Create a new map and attach it to the map div
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12, // Zoom level
        center: location // Center of the map
      })

      // Add a marker to the location
      new google.maps.Marker({
        position: location,
        map: map,
        title: 'Marketplace Location'
      })
    }

    // Dynamically inject Google Maps API script into the page
    const googleMapScript = document.createElement('script')
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDov3YdR3KFqIA3ZC216h-l3S8saUN_KgQ&callback=initMap`
    googleMapScript.async = true
    googleMapScript.defer = true
    window.document.body.appendChild(googleMapScript)
  }, [])

  return (
    <>
      <Header />

      <div
        style={{
          background: 'linear-gradient(90deg, #d3d3d3, #8bcbff)',
          padding: '1rem 0',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '8px',
            border: '2px solid black', // Black border added here
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Marketplace Location Section */}
          <h1
            style={{
              fontSize: '36px',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '20px'
            }}
          >
            Marketplace Location
          </h1>
          <p
            style={{
              fontSize: '16px',
              textAlign: 'center',
              marginBottom: '30px'
            }}
          >
            Our marketplace is located in the heart of Dublin, making it easy
            for both local students and faculty to access the marketplace.
          </p>

          {/* Google Map Container */}
          <div
            id="map"
            style={{ height: '500px', width: '100%', margin: '30px 0' }}
          ></div>

          {/* Delivery Pricing Section */}
          <section style={{ marginBottom: '30px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '10px'
              }}
            >
              Delivery Radius & Pricing
            </h2>
            <p>
              We offer delivery services based on your distance from our
              marketplace:
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <strong>Local (within 5 km):</strong> Free delivery.
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Within 10 km:</strong> €4.99 delivery charge.
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Beyond 10 km:</strong> €9.99 delivery charge.
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Express Delivery (any distance):</strong> €14.99
                delivery charge.
              </li>
            </ul>
            <p style={{ fontSize: '14px', color: '#555' }}>
              Note: Delivery times may vary based on traffic and weather
              conditions.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '10px'
              }}
            >
              Delivery Methods
            </h2>
            <p>We offer the following delivery methods for your convenience:</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <strong>Standard Delivery:</strong> Delivered within 3-5 working
                days.
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Express Delivery:</strong> Delivered within 1-2 working
                days.
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Click & Collect:</strong> Collect from a local pickup
                point within 24 hours.
              </li>
            </ul>
          </section>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default DeliveryPage
