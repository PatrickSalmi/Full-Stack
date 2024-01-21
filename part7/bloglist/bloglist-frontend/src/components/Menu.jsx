import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../reducers/userReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Menu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.users.currentUser)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logOut())
  }

  const padding = {
    paddingRight: 5
  }

  return(
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
          {user
            ? <>
              <Nav.Link>
                <em style={padding}>{user.name} logged in</em>
              </Nav.Link>
              <Button variant='secondary' type='submit' onClick={handleLogout}>
                logout
              </Button>
            </>
            : <Button variant='primary' type='submit' onClick={() => navigate('/login')}>
              login
            </Button>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )

}

export default Menu