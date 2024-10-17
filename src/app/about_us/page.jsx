'use client'

import React from 'react'
import Link from 'next/link'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

const AboutUsPage = () => {
  return (
    <>
      <Header />

      <section
        style={{
          background: 'linear-gradient(90deg, #d3d3d3, #8bcbff)',
          color: 'black', // Set text color to black
          padding: '5rem 2rem',
          textAlign: 'center'
        }}
      >
        <h1 style={{ fontSize: '48px', fontWeight: '700' }}>About Us</h1>
        <p style={{ fontSize: '20px', maxWidth: '600px', margin: '1rem auto' }}>
          Connecting the TU Dublin community through a vibrant and trusted
          online marketplace.
        </p>
      </section>

      {/* Main Content Section */}
      <div
        style={{
          background: 'linear-gradient(90deg, #d3d3d3, #8bcbff)',
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
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            border: '2px solid black', // Black border added
            boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
            color: 'black' // Ensure text inside is black
          }}
        >
          <h2
            style={{
              fontSize: '28px',
              fontWeight: '600',
              marginBottom: '1rem'
            }}
          >
            Our Story
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
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
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            border: '2px solid black', // Black border added
            boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
            color: 'black' // Ensure text inside is black
          }}
        >
          <h2
            style={{
              fontSize: '28px',
              fontWeight: '600',
              marginBottom: '1rem'
            }}
          >
            Our Mission
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
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
              color: 'black'
            }}
          >
            Meet Our Team
          </h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem'
            }}
          >
            {/* Artem Mikheev */}
            <div style={{ textAlign: 'center', color: 'black' }}>
              {' '}
              <img
                src="images/artem.png"
                alt="Artem Mikheev"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  border: '2px solid black' // Black border around the image
                }}
              />
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginTop: '1rem'
                }}
              >
                Artem Mikheev
              </h3>
              <p style={{ fontSize: '16px', color: 'black' }}>Founder</p>
            </div>

            {/* Tadhg Roche */}
            <div style={{ textAlign: 'center', color: 'black' }}>
              {' '}
              <img
                src="images/tadhg.png"
                alt="Tadhg Roche"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  border: '2px solid black' // Black border around the image
                }}
              />
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginTop: '1rem'
                }}
              >
                Tadhg Roche
              </h3>
              <p style={{ fontSize: '16px', color: 'black' }}>Co-Founder</p>
            </div>
          </div>
        </section>
      </div>

      {/* Call-to-Action Section */}
      <section
        style={{
          background: 'linear-gradient(90deg, #d3d3d3, #8bcbff)',
          color: 'black', // Set text color to black
          padding: '3rem 2rem',
          textAlign: 'center'
        }}
      >
        <h2
          style={{
            fontSize: '30px',
            fontWeight: '600',
            marginBottom: '1.5rem'
          }}
        >
          Join Our Community
        </h2>
        <p
          style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 2rem' }}
        >
          Ready to get started? Whether you’re a buyer or seller, TU Marketplace
          is here to support your needs.
        </p>
        <Link href="/">
          <button
            style={{
              padding: '12px 30px',
              backgroundColor: '#fff',
              color: '#007bff',
              fontSize: '18px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Sign Up Now
          </button>
        </Link>
      </section>

      <Footer />
    </>
  )
}

export default AboutUsPage
