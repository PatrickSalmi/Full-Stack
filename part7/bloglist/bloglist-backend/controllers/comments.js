const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

const populateBlog = async (commentId) => {
  return await Comment.findById(commentId).populate('blog')
}

commentsRouter.get('/', async (req, res) => {
  const comments = await Comment.find({})
  res.json(comments)
})

commentsRouter.post('/', async (req, res) => {
  const body = req.body
  const comment = new Comment({
    message: body.message,
    blog: body.blog
  })

  const blog = await Blog.findById(body.blog)

  const newComment = await comment.save()
  blog.comments = blog.comments.concat(newComment._id)
  await blog.save()

  const populatedComment = await populateBlog(newComment.id)

  res.status(201).json(populatedComment)
})

module.exports = commentsRouter