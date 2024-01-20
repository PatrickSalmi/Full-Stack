import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../reducers/userReducer'

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

  const menuStyle = {
    backgroundColor: 'rgb(220, 220, 220)',
    padding: '8px'
  }


  return (
    <div style={menuStyle}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {user
        ? <>
          {user.name} logged in
          <button style={padding} onClick={handleLogout}>logout</button>
        </>
        : <button style={padding} onClick={() => navigate('/login')}>login</button>
      }
    </div>
  )

}

export default Menu