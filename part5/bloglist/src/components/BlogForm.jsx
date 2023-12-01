const BlogForm = (props) => (
    <>
      <h2>create new</h2>
      <form onSubmit={props.addBlog}>
        <div>title:
          <input
          value={props.title} 
          onChange={({ target }) => props.setTitle(target.value)}
          />
        </div>
        <div>author:
          <input
          value={props.author} 
          onChange={({ target }) => props.setAuthor(target.value)}
          />
        </div>
        <div>url:
          <input
          value={props.url} 
          onChange={({ target }) => props.setUrl(target.value)}
          />
        </div>
        <div> <button type="submit">create</button></div>
      </form>
      <br/>
    </>
)

export default BlogForm