import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initilizeBlogs } from './reducers/blogReducer'
import { checkUser } from './reducers/userReducer'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initilizeBlogs())
    dispatch(checkUser())
  }, [dispatch])

  return(
    <div>
      <h2>blogs</h2>
      <Notification />
      <LoginForm />
      <BlogForm />
      <BlogList />
    </div>
  )

}

export default App