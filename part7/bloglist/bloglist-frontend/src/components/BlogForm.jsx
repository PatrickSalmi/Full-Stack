import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useRef } from 'react'
import Togglable from './Togglable'
import { Form, Button } from 'react-bootstrap'

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
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type='text'
            name='title'
            id='title-input'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            type='text'
            name='author'
            id='author-input'
          />
        </Form.Group>
        <Form.Group style={{ paddingBottom: '8px' }}>
          <Form.Label>url:</Form.Label>
          <Form.Control
            type='text'
            name='url'
            id='url-input'
          />
        </Form.Group>
        <Button variant='primary' type='submit' id='submit-button'>
          create
        </Button>
      </Form>
    </Togglable>
  )
}

export default BlogForm