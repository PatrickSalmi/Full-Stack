import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

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
    <div style={{ paddingTop: '8px' }}>
      <Table striped >
        <tbody>
          {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
            <tr key={blog.id}>
              <td style={blogStyle}>
                <Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList