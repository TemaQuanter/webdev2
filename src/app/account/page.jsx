'use client'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Image from 'next/image'

const Account = () => {
  return (
    <div className="min-h-screen bg-gray-100 d-flex flex-column justify-content-center align-items-center">
      <div className="w-100">
        <Button
          variant="outline-secondary"
          style={{ margin: '3rem 0 0 3rem' }}
          className="btn btn-sm"
        >
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <i className="bi bi-chevron-left"></i>
          </Link>
        </Button>
      </div>
      <Image
        src="/images/image.png"
        width={150}
        height={150}
        style={{ borderRadius: '50%', marginTop: '3rem' }}
        alt="Profile picture"
      />
      <div className="d-flex flex-row justify-content-center align-items-center">
        <p className="fs-4 fw-bolder" style={{ margin: '1rem 0 1rem 0' }}>
          Loren Gray
        </p>
        <i className="bi bi-pencil-square" style={{ marginLeft: '0.5rem' }}></i>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <div
          className="text-center flex-grow-1"
          style={{ padding: '1rem', width: '10rem' }}
        >
          <p className="mb-1">Purchases</p>
          <p className="fw-bold">12</p>
        </div>
        <div
          className="border-start"
          style={{ height: '5rem', width: '1px', backgroundColor: 'black' }}
        ></div>
        <div
          className="text-center flex-grow-1"
          style={{ padding: '1rem', width: '10rem' }}
        >
          <p className="mb-1">Sales</p>
          <p className="fw-bold">9</p>
        </div>
      </div>
      <p className="fs-3 fw-bolder">Balance: 100</p>
      <Link href="/sales">
        <Button
          variant="primary"
          style={{
            width: '80vw',
            maxWidth: '30rem',
            borderRadius: '20px',
            margin: '2rem 0 0 0'
          }}
        >
          Sales
        </Button>
      </Link>
      <Link href="/purchases">
        <Button
          variant="primary"
          style={{
            width: '80vw',
            maxWidth: '30rem',
            borderRadius: '20px',
            margin: '2rem 0 0 0'
          }}
        >
          Purchases
        </Button>
      </Link>
    </div>
  )
}

export default Account
