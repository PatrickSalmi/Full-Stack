const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

const populateUser = async (blogId) => {
  return await Blog.findById(blogId).populate('user')
}

blogsRouter.post('/',userExtractor, async (req, res) => {
  const body = req.body

  const user = req.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url : body.url,
    likes: body.likes,
    user: user.id
  })

  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()

  const populatedBlog = await populateUser(newBlog.id)

  res.status(201).json(populatedBlog)
})

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

blogsRouter.delete('/:id',userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  const user = req.user

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(blog.id)
    res.status(204).end()
  }
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })

  const populatedBlog = await populateUser(updatedBlog.id)
  res.status(200).json(populatedBlog)


})

module.exports = blogsRouter