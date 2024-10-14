import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const TrendingCategories = () => {
  return (
    <>
      <p
        style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '5rem' }}
        className="fs-3"
      >
        Trending Categories
      </p>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ width: '100vw' }}
      >
        <Container>
          <Row className="text-center my-5">
            {/* First Column with 3 buttons */}
            <Col>
              <Button
                className="rounded-circle mb-4" // Adds margin between the buttons
                style={{ width: '100px', height: '100px' }}
              >
                <img
                  src="https://www.ieabroad.com/wp-content/uploads/TUD.png"
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Button>
              <Button
                className="rounded-circle mb-4"
                style={{ width: '100px', height: '100px' }}
              >
                2 of 3
              </Button>
              <Button
                className="rounded-circle"
                style={{ width: '100px', height: '100px' }}
              >
                3 of 3
              </Button>
            </Col>

            {/* Second Column with 3 buttons */}
            <Col>
              <Button
                className="rounded-circle mb-4"
                style={{ width: '100px', height: '100px' }}
              >
                1 of 3
              </Button>
              <Button
                className="rounded-circle mb-4"
                style={{ width: '100px', height: '100px' }}
              >
                2 of 3
              </Button>
              <Button
                className="rounded-circle"
                style={{ width: '100px', height: '100px' }}
              >
                3 of 3
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default TrendingCategories
