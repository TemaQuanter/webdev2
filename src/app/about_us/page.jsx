'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

const AboutUsPage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('') // State for storing email input
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [emailError, setEmailError] = useState('') // State for email error message

  // Trigger fade-in and slide-in animation when the component mounts
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const fadeInTextStyle = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 2.5s ease-out ${delay}s, transform 2.5s ease-out ${delay}s` // Slower animation
  })

  const slideInStyle = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(-50px)', // Slide in from the left
    transition: `opacity 1.5s ease-out ${delay}s, transform 1.5s ease-out ${delay}s`
  })

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Simple regex for email validation
    return emailPattern.test(email)
  }

  const handleSubmit = () => {
    if (!email) {
      setEmailError('Please enter your email')
      return
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email')
      return
    }

    setEmailError('') // Clear any previous error
    setIsSubmitting(true)

    // Simulate form submission process with a timeout
    setTimeout(() => {
      setIsSubmitting(false)
      setFormSubmitted(true)
    }, 2000) // Simulate 2-second form submission
  }

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
          About Us
        </h1>
        <p
          style={{
            fontSize: '20px',
            maxWidth: '600px',
            margin: '1rem auto',
            ...fadeInTextStyle(0.2)
          }}
        >
          Connecting the TU Dublin community through a vibrant and trusted
          online marketplace.
        </p>
      </section>

      {/* Main Content Section */}
      <div
        style={{
          background: 'linear-gradient(90deg, #d3d3d3, #8bcbff)', // No animation on background
          padding: '3rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3rem'
        }}
      >
        {/* Our Story */}
        <div
          style={{
            maxWidth: '900px',
            backgroundColor: '#fff', // Static background color
            padding: '2rem',
            borderRadius: '8px',
            border: '2px solid black',
            boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
            color: 'black'
          }}
        >
          <h2
            style={{
              fontSize: '28px',
              fontWeight: '600',
              marginBottom: '1rem',
              ...fadeInTextStyle(0.4)
            }}
          >
            Our Story
          </h2>
          <p
            style={{
              fontSize: '18px',
              lineHeight: '1.6',
              ...fadeInTextStyle(0.6)
            }}
          >
            TU Marketplace was created with the vision of providing students and
            faculty members a place to buy, sell, and exchange goods with ease
            and trust. Our story started with a small group of students, and now
            we are a thriving marketplace that connects people within the
            university ecosystem. Whether it's finding textbooks, student
            essentials, or the latest tech gadgets, we’ve got you covered.
          </p>
        </div>

        {/* Our Mission */}
        <div
          style={{
            maxWidth: '900px',
            backgroundColor: '#fff', // Static background color
            padding: '2rem',
            borderRadius: '8px',
            border: '2px solid black',
            boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
            color: 'black'
          }}
        >
          <h2
            style={{
              fontSize: '28px',
              fontWeight: '600',
              marginBottom: '1rem',
              ...fadeInTextStyle(0.8)
            }}
          >
            Our Mission
          </h2>
          <p
            style={{
              fontSize: '18px',
              lineHeight: '1.6',
              ...fadeInTextStyle(1)
            }}
          >
            Our mission is simple: to build a trusted community-driven
            marketplace for students, alumni, and faculty at TU Dublin. We
            believe that by creating a platform focused on convenience,
            transparency, and affordability, we can make student life easier,
            more sustainable, and connected. Our marketplace empowers both
            buyers and sellers to engage in safe and reliable transactions.
          </p>
        </div>

        {/* Meet Our Team Section */}
        <section style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2
            style={{
              fontSize: '28px',
              fontWeight: '600',
              marginBottom: '1.5rem',
              color: 'black',
              ...fadeInTextStyle(1.2)
            }}
          >
            Meet Our Team
          </h2>
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}
          >
            {/* Artem Mikheev */}
            <div style={{ textAlign: 'center', color: 'black' }}>
              <img
                src="images/artem.png"
                alt="Artem Mikheev"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  border: '2px solid black',
                  ...fadeInTextStyle(1.4)
                }}
              />
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginTop: '1rem',
                  ...fadeInTextStyle(1.6)
                }}
              >
                Artem Mikheev
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: 'black',
                  ...fadeInTextStyle(1.8)
                }}
              >
                Founder
              </p>
            </div>

            {/* Tadhg Roche */}
            <div style={{ textAlign: 'center', color: 'black' }}>
              <img
                src="images/tadhg.png"
                alt="Tadhg Roche"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  border: '2px solid black',
                  ...fadeInTextStyle(1.6)
                }}
              />
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginTop: '1rem',
                  ...fadeInTextStyle(1.8)
                }}
              >
                Tadhg Roche
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: 'black',
                  ...fadeInTextStyle(2)
                }}
              >
                Co-Founder
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Call-to-Action Section for Newsletter */}
      <section
        style={{
          background: 'linear-gradient(90deg, #d3d3d3, #8bcbff)', // No animation on background
          color: 'black',
          padding: '3rem 2rem',
          textAlign: 'center'
        }}
      >
        {/* Newsletter subscription form */}
        {formSubmitted ? (
          <p style={{ fontSize: '20px', color: 'green' }}>
            Thank you for subscribing to our newsletter!
          </p>
        ) : (
          <>
            <h2
              style={{
                fontSize: '30px',
                fontWeight: '600',
                marginBottom: '1.5rem',
                ...fadeInTextStyle(2.2)
              }}
            >
              Join Our Newsletter
            </h2>
            <p
              style={{
                fontSize: '18px',
                maxWidth: '600px',
                margin: '0 auto 2rem',
                ...fadeInTextStyle(2.4)
              }}
            >
              Stay updated with the latest news, events, and offers from TU
              Marketplace. Subscribe to our newsletter today!
            </p>
            <div style={{ marginBottom: '1rem', ...slideInStyle(0.4) }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: '10px',
                  width: '300px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: '2px solid #ccc'
                }}
              />
              {emailError && (
                <p style={{ color: 'red', fontSize: '14px' }}>{emailError}</p>
              )}
            </div>
            <button
              onClick={handleSubmit}
              style={{
                padding: '12px 30px',
                backgroundColor: isSubmitting ? '#ccc' : '#fff',
                color: '#007bff',
                fontSize: '18px',
                border: 'none',
                borderRadius: '6px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                ...slideInStyle(0.6) // Slide-in effect for the button
              }}
              disabled={isSubmitting} // Disable button during submission
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </>
        )}
      </section>

      <Footer />
    </>
  )
}

export default AboutUsPage
