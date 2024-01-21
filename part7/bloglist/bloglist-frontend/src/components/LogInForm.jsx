import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logIn } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            name="Username"
            id='username'
          />
        </Form.Group>
        <Form.Group style={{ paddingBottom: '8px' }}>
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            id='password'
          />
        </Form.Group>
        <Button variant="primary" type="submit" id='login-button'>
          login
        </Button>
      </Form>
    </div>
  )
}

export default LogInForm