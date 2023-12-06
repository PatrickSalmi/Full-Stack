import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [button, setButton] = useState('view')

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showToUser = { display: user && blog.user.username === user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    setButton(visible ? 'view' : 'hide')
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{button}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <br/>
        {blog.likes} <button onClick={() => addLike(blog)}>like</button>
        <br/>
        {blog.user.name}
        <div style={showToUser}><button onClick={() => deleteBlog(blog)}>remove</button></div>
      </div>
    </div>
  )
}

export default Blog