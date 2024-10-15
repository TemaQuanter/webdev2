import Button from 'react-bootstrap/Button'
import Link from 'next/link'

const ButtonBack = (props) => {
  return (
    <div className="w-100">
      <Button
        variant="outline-secondary"
        style={{ margin: '3rem 0 0 3rem' }}
        className="btn btn-sm"
      >
        <Link
          href={props.href}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <i className="bi bi-chevron-left"></i>
        </Link>
      </Button>
    </div>
  )
} // end function ButtonBack

export default ButtonBack
