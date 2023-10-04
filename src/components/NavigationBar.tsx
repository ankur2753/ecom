import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
import '../css/Navigation.css'
import routes, { HOME } from '../constants/links'
import { RxHamburgerMenu } from 'react-icons/rx'
import { TfiClose } from 'react-icons/tfi'

const ResponsiveNavBar: React.FC = () => {
  const [ isOpen, setIsOpen ] = useState(false)
  const handleOnClick = () => setIsOpen(!isOpen)
  return (
    <nav>
      <Link to={HOME.to} >
        <span className="brand">
          Ramesh Mart
        </span>
      </Link>
      <div className='links'>
        <div className="d-xs-flex d-md-none d-lg-none">
          {
            isOpen ?
              <TfiClose onClick={handleOnClick} />
              :
              <RxHamburgerMenu onClick={handleOnClick} />
          }
        </div>
        {routes.map(link => <Link key={`${link.text}-${link.to}`} to={link.to}>{link.text}</Link>)}
      </div>
    </nav>
  )
}

export default ResponsiveNavBar