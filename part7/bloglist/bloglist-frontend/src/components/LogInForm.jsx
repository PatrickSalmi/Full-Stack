import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logIn } from '../reducers/userReducer'

const LogInForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.users.currentUser)

  const handleLogin = async (event) => {
    event.preventDefault()

    const successfulLogin = await dispatch(logIn({
      username: event.target.Username.value,
      password: event.target.Password.value
    }))

    if (successfulLogin) {
      event.target.Username.value = ''
      event.target.Password.value = ''
      navigate('/')
    }
  }

  return (
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
  )
}

export default LogInForm