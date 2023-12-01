import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
        const user = await loginService.login({
            username, password,
        })
        
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )

        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
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

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
      }

      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setNotification(`a new blog ${title} by ${author ? author : "-"} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
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
    <LoginForm
    notification={notification}
    isError={isError}
    handleLogin={handleLogin}
    username={username}
    setUsername={setUsername}
    password={password}
    setPassword={setPassword}
    />
  )

  const blogInfo = () => (
    <>
      <BlogForm
      addBlog={addBlog}
      title={title}
      setTitle={setTitle}
      author={author}
      setAuthor={setAuthor}
      url={url}
      setUrl={setUrl}
      />
    </>
  )

  return(
    <>
      {!user && loginInfo()}

      {user && <div>
        <h2>blogs</h2>
        <Notification message={notification} isError={isError}/>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogInfo()}
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
          </div>
        }
    </>

  )

}

export default App