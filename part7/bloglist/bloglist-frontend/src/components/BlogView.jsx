import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addLike, addComment } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const BlogView = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const match = useMatch('/blogs/:id')

  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  const handleComment = (event) => {
    event.preventDefault()

    dispatch(addComment({
      message: event.target.comment.value,
      blog: blog.id
    }))

    event.target.comment.value = ''
  }

  if (blog) {
    return (
      <div>
        <h2>{blog.title} {blog.author}</h2>
        <div style={{ padding: '10px' }}><a href={blog.url}> {blog.url}</a></div>
        {blog.likes} <Button
          variant='primary'
          type='submit'
          onClick={() => dispatch(addLike(blog))}
          id='like-button'
        >
          like
        </Button>
        <div style={{ paddingTop: '10px' }}>added by {blog.user.name}</div>
        <h3 style={{ paddingTop: '10px' }}>comments</h3>
        <Form onSubmit={handleComment}>
          <Form.Group style={{ paddingBottom: '10px' }}>
            <Form.Label style={{ paddingTop: '10px' }}>add comment</Form.Label>
            <Form.Control
              type='text'
              name='comment'
              id='comment-input'
            />
          </Form.Group>
          <Button variant='primary' type='submit' id='comment-button'>
            add comment
          </Button>
        </Form>
        <ul>
          {blog.comments.map(comment =>
            <li key={comment.id}>{comment.message}</li>
          )}
        </ul>
      </div>
    )
  }
}

export default BlogView