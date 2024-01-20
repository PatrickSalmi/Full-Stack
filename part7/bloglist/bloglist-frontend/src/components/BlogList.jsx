import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <table style={{ width: '100%' }}>
        <tbody>
          {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
            <tr key={blog.id}>
              <td style={blogStyle}>
                <Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default BlogList