import { useDispatch, useSelector } from 'react-redux'
import { logIn, logOut } from '../reducers/userReducer'
import Togglable from './Togglable'

const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(logIn({
      username: event.target.Username.value,
      password: event.target.Password.value
    }))

    event.target.Username.value = ''
    event.target.Password.value = ''

  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logOut())
  }

  if (user) {
    return (
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
    )
  }

  if (!user) {
    return (
      <Togglable buttonLabel="log in">
        <div>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                name="Username"
                id='username'
              />
            </div>
            <div>
              password
              <input
                type="password"
                name="Password"
                id='password'
              />
            </div>
            <button type="submit" id='login-button'>login</button>
          </form>
        </div>
      </Togglable>
    )
  }

}

export default LoginForm