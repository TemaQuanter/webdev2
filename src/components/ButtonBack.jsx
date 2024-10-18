import Button from 'react-bootstrap/Button'
import Link from 'next/link'

const ButtonBack = (props) => {
  return (
    <div className="w-100">
      <Link href={props.href} passHref>
        <Button
          variant="outline-secondary"
          style={{ margin: '3rem 0 0 3rem' }}
          className="btn btn-sm"
        >
          <i className="bi bi-chevron-left"></i> Back
        </Button>
      </Link>
    </div>
  )
} // end function ButtonBack

export default ButtonBack
