import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addLike, addComment } from '../reducers/blogReducer'

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
        <div><a href={blog.url}> {blog.url}</a></div>
        {blog.likes} <button onClick={() => dispatch(addLike(blog))} id='like-button'>like</button>
        <div>added by {blog.user.name}</div>
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input name='comment' id='comment-input'></input>
          <button type='submit' id='comment-button'>add comment</button>
        </form>
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