import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useRef } from 'react'
import Togglable from './Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.currentUser)
  const blogFormRef = useRef()

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    dispatch(createBlog({
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }))

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

  }

  if (!user) {
    return null
  }

  return (
    <Togglable buttonLabel="add blog" ref={blogFormRef}>
      <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>title:
            <input name='title' id='title-input'/>
          </div>
          <div>author:
            <input name='author' id='author-input'/>
          </div>
          <div>url:
            <input name='url' id='url-input'/>
          </div>
          <div> <button type="submit" id='submit-button'>create</button></div>
        </form>
      </div>
    </Togglable>
  )
}

export default BlogForm