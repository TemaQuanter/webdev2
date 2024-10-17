'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

const DeliveryPage = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Trigger fade-in animation when the component mounts
  useEffect(() => {
    setIsVisible(true)

    // Define the initMap function globally by assigning it to the window object
    window.initMap = function () {
      const location = { lat: 53.3511, lng: -6.2786 } // Example: Dublin coordinates

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

  // Function to apply fade-in effect for text elements only
  const fadeInTextStyle = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 2.5s ease-out ${delay}s, transform 2.5s ease-out ${delay}s`
  })

  return (
    <>
      <Header />

      {/* Section with background, but text fades in */}
      <section
        style={{
          background: 'linear-gradient(90deg, #d3d3d3, #8bcbff)', // Static background, no animation here
          color: 'black',
          padding: '5rem 2rem',
          textAlign: 'center'
        }}
      >
        {/* Only the text fades in */}
        <h1
          style={{ fontSize: '48px', fontWeight: '700', ...fadeInTextStyle() }}
        >
          Delivery Information
        </h1>
        <p
          style={{
            fontSize: '20px',
            maxWidth: '600px',
            margin: '1rem auto',
            ...fadeInTextStyle(0.2)
          }}
        >
          Get all the details on how your products are delivered, timeframes,
          and additional delivery charges based on your location.
        </p>
      </section>

      <div
        style={{
          background: 'linear-gradient(90deg, #d3d3d3, #8bcbff)', // No animation on background
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
            backgroundColor: '#fff', // Static background color
            padding: '30px',
            borderRadius: '8px',
            border: '2px solid black',
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Marketplace Location Section */}
          <h1
            style={{
              fontSize: '36px',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '20px',
              ...fadeInTextStyle(0.4) // Fade-in with delay
            }}
          >
            Marketplace Location
          </h1>
          <p
            style={{
              fontSize: '16px',
              textAlign: 'center',
              marginBottom: '30px',
              ...fadeInTextStyle(0.6) // Fade-in with delay
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
                marginBottom: '10px',
                ...fadeInTextStyle(0.8) // Fade-in with delay
              }}
            >
              Delivery Radius & Pricing
            </h2>
            <p style={{ ...fadeInTextStyle(1) }}>
              We offer delivery services based on your distance from our
              marketplace:
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px', ...fadeInTextStyle(1.2) }}>
                <strong>Local (within 5 km):</strong> Free delivery.
              </li>
              <li style={{ marginBottom: '10px', ...fadeInTextStyle(1.4) }}>
                <strong>Within 10 km:</strong> €4.99 delivery charge.
              </li>
              <li style={{ marginBottom: '10px', ...fadeInTextStyle(1.6) }}>
                <strong>Beyond 10 km:</strong> €9.99 delivery charge.
              </li>
              <li style={{ marginBottom: '10px', ...fadeInTextStyle(1.8) }}>
                <strong>Express Delivery (any distance):</strong> €14.99
                delivery charge.
              </li>
            </ul>
            <p
              style={{ fontSize: '14px', color: '#555', ...fadeInTextStyle(2) }}
            >
              Note: Delivery times may vary based on traffic and weather
              conditions.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '10px',
                ...fadeInTextStyle(2.2) // Fade-in with delay
              }}
            >
              Delivery Methods
            </h2>
            <p style={{ ...fadeInTextStyle(2.4) }}>
              We offer the following delivery methods for your convenience:
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px', ...fadeInTextStyle(2.6) }}>
                <strong>Standard Delivery:</strong> Delivered within 3-5 working
                days.
              </li>
              <li style={{ marginBottom: '10px', ...fadeInTextStyle(2.8) }}>
                <strong>Express Delivery:</strong> Delivered within 1-2 working
                days.
              </li>
              <li style={{ marginBottom: '10px', ...fadeInTextStyle(3) }}>
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
