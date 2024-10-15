'use client'

const Footer = () => {
  return (
    <div
      className="d-flex flex-wrap justify-content-between align-items-start p-4 m-0"
      style={{
        width: '100vw',
        height: 'auto',
        background: 'linear-gradient(90deg, #d3d3d3, #8bcbff)',
        padding: '1rem 0'
      }}
    >
      {/* Section 1: Contact Information */}
      <div className="text-left mb-3" style={{ minWidth: '200px' }}>
        <h6 className="fw-bold">Contact Information</h6>
        <p className="m-0">Contact us at support@marketplace.com</p>
        <p className="m-0">Call us at +123 456 789</p>
        <p className="m-0">Artems House</p>
      </div>

      {/* Section 2: Customer Support */}
      <div className="text-left mb-3" style={{ minWidth: '200px' }}>
        <h6 className="fw-bold">Customer Support</h6>
        <p className="m-0">Help Center</p>
        <p className="m-0">FAQs</p>
        <p className="m-0">Returns & Refunds Policy</p>
        <p className="m-0">Shipping Information</p>
      </div>

      {/* Section 3: Legal & Company Info */}
      <div className="text-left mb-3" style={{ minWidth: '200px' }}>
        <h6 className="fw-bold">Legal & Policies</h6>
        <p className="m-0">Terms of Service</p>
        <p className="m-0">Privacy Policy</p>
        <p className="m-0">Cookie Policy</p>
        <p className="m-0">User Agreement</p>
      </div>

      {/* Section 4: Social & Payment */}
      <div className="text-left mb-3" style={{ minWidth: '200px' }}>
        <h6 className="fw-bold">Social & Payment</h6>
        <p className="m-0">
          Follow us on: Facebook, Twitter, Instagram, LinkedIn
        </p>
        <p className="m-0">We accept: Visa, MasterCard, PayPal, etc.</p>
        <p className="m-0">© 2024 Marketplace Inc. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
