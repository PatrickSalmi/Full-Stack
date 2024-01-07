import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id='title-input'
          />
        </div>
        <div>author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id='author-input'
          />
        </div>
        <div>url:
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id='url-input'
          />
        </div>
        <div> <button type="submit" id='submit-button'>create</button></div>
      </form>
    </>
  )
}

export default BlogForm