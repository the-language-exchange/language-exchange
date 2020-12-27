import React from 'react'
import { Link  } from 'react-router-dom'
import { Navbar as Nav} from 'react-bootstrap'
import { logout } from '../services/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
const handleLogout = props => {
  logout()
  .then( ()=>{
    props.setUser(null)

  })
}

export default function NavbarList(props) {
 
  return (
    <Nav className='nav justify-content-end profile'>
    <Nav.Brand>
      <Link to='/'>Home</Link>
    </Nav.Brand>

    { props.user ? (
      <>
    
      <Nav.Brand>
      <Link to={`/myuser/${props.user._id}`}>My Profile</Link>
     </Nav.Brand>
     <Nav.Brand>
      <Link to={'/messages'}>Messages</Link>
     </Nav.Brand>

    <Nav.Brand>
      <Link to='/' onClick={() => handleLogout(props)}>Logout</Link>
    </Nav.Brand>
    
    </>
   
    ) : (   
      <>
    <Nav.Brand>
      <Link to='/signup'>Signup</Link>
    </Nav.Brand>
    <Nav.Brand>
      <Link to='/login'>Login</Link>
    </Nav.Brand>
    <FontAwesomeIcon icon = {faSlidersH} />
    </>
    )}

    </Nav>
  )
}
