import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
        
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
        setNotification('Wrong username or password')
        setIsError(true)
        setTimeout(() => {
            setNotification(null)
            setIsError(false)
        }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setNotification(`a new blog ${blogObject.title} by ${blogObject.author ? blogObject.author : "-"} added`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (exception) {
      setNotification('Missing fields')
      setIsError(true)
      setTimeout(() => {
        setNotification(null)
        setIsError(false)
      }, 3000)
    }
  }

  const loginInfo = () => (
      <Togglable buttonLabel="log in">
        <LoginForm login={handleLogin}/>
      </Togglable>
    )
  
  const blogFormRef = useRef()

  const blogInfo = () => (
    <Togglable buttonLabel="add blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  return(
    <>
      <h2>blogs</h2>
      <Notification message={notification} isError={isError}/>
      {!user && loginInfo()}

      {user && <div>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        {blogInfo()}
        </div>
      }
      {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
    </>

  )

}

export default App