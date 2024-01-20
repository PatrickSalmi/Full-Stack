import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addLike } from '../reducers/blogReducer'

const BlogView = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const match = useMatch('/blogs/:id')

  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  if (blog) {
    return (
      <div>
        <h3>{blog.title} {blog.author}</h3>
        <div><a href={blog.url}> {blog.url}</a></div>
        {blog.likes} <button onClick={() => dispatch(addLike(blog))} id='like-button'>like</button>
        <div>added by {blog.user.name}</div>
      </div>
    )
  }
}

export default BlogView