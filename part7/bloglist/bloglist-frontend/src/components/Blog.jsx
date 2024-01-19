import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { addLike, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [visible, setVisible] = useState(false)
  const [button, setButton] = useState('view')

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showToUser = { display: user && blog.user.username === user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    setButton(visible ? 'view' : 'hide')
  }

  const deleteBlog = (blogObject) => {
    try {
      if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
        dispatch(removeBlog(blogObject.id))
      }
    } catch (exception) {
      dispatch(setNotification('Unable to delete blog', 5, true))
    }
  }

  const handleLike = (blogObject) => {
    try {
      dispatch(addLike(blogObject))
    } catch (exception) {
      dispatch(setNotification('Something went wrong', 5, true))
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility} id='toggle-button'>{button}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {blog.url}
        <br/>
        {blog.likes} <button onClick={() => handleLike(blog)} id='like-button'>like</button>
        <br/>
        {blog.user.name}
        <div style={showToUser}><button onClick={() => deleteBlog(blog)} id='delete-button'>remove</button></div>
      </div>
    </div>
  )
}

export default Blog