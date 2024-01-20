import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { Link } from 'react-router-dom'

const UserView = () => {
  const users = useSelector(state => state.users.users)
  const match = useMatch('/users/:id')

  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  if (user) {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map(blog =>
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              <li>{blog.title}</li>
            </Link>
          )}
        </ul>
      </div>
    )
  }
}

export default UserView