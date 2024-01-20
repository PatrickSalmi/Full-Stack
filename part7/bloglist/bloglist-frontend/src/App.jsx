import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { initilizeBlogs } from './reducers/blogReducer'
import { initilizeUsers, checkUser } from './reducers/userReducer'
import BlogForm from './components/BlogForm'
import Menu from './components/Menu'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import LogInForm from './components/LogInForm'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initilizeBlogs())
    dispatch(initilizeUsers())
    dispatch(checkUser())
  }, [dispatch])

  return(
    <div>
      <Menu />
      <Notification />
      <h2>blog app</h2>
      <div>
        <Routes>
          <Route path='/' element={
            <>
              <BlogForm />
              <BlogList />
            </>
          } />
          <Route path='/users' element={<UserList />} />
          <Route path='/login' element={<LogInForm />} />
          <Route path='/users/:id' element={<UserView />} />
          <Route path='/blogs/:id' element={<BlogView />} />
        </Routes>
      </div>
    </div>
  )
}

export default App