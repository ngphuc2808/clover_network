import { Fragment, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children?: ReactNode
  title?: string
  to?: string
  className?: string
  onClick?: () => void
  disable?: boolean
}

const Button = ({
  title,
  children,
  to,
  className = '',
  onClick,
  disable,
}: Props) => {
  return (
    <Fragment>
      {to ? (
        <Link to={`${to}`} className={`block ${className}`} onClick={onClick}>
          {title}
          {children}
        </Link>
      ) : (
        <button className={`${className}`} onClick={onClick} disabled={disable}>
          {title}
          {children}
        </button>
      )}
    </Fragment>
  )
}

export default Button
