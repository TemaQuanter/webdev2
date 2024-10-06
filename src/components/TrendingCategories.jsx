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
            <Col>
              <Button
                className="rounded-circle"
                style={{ width: '100px', height: '100px' }}
              >
                <img
                  src="https://www.ieabroad.com/wp-content/uploads/TUD.png"
                  alt=""
                />
              </Button>
            </Col>
            <Col>
              <Button
                className="rounded-circle"
                style={{ width: '100px', height: '100px' }}
              >
                2 of 3
              </Button>
            </Col>
            <Col>
              <Button
                className="rounded-circle"
                style={{ width: '100px', height: '100px' }}
              >
                3 of 3
              </Button>
            </Col>
          </Row>
          <Row className="text-center my-5">
            <Col>
              <Button
                className="rounded-circle"
                style={{ width: '100px', height: '100px' }}
              >
                1 of 3
              </Button>
            </Col>
            <Col>
              <Button
                className="rounded-circle"
                style={{ width: '100px', height: '100px' }}
              >
                2 of 3
              </Button>
            </Col>
            <Col>
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
