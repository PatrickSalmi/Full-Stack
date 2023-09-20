const dummy = (blogs) => (1)

const totalLikes = (blogs) => (blogs.reduce((sum, blog) => sum + blog.likes, 0))

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce(
    (prev, current) =>
      prev.likes > current.likes ? prev : current
  )

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}