const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('all blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier id exsist for blogs', async () => {
  const response = await api.get('/api/blogs')

  const ids = response.body.map(r => r.id)

  expect(response.body[0].id).toBeDefined()
  expect(ids).toContain(response.body[0].id)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'test',
    author: 'Arto',
    url: 'www.google.com',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(r => r.title)

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain(
    'test'
  )

})

test('set default likes to 0', async () => {
  const newBlog = {
    title: 'no likes',
    author: 'Pekka',
    url: 'www.google.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blog = response.body.find(r => r.title === 'no likes')

  expect(blog.likes).toBe(0)

})

test('error for missing title or url', async () => {
  const newBlog = {
    author: 'Pekka',
    url: 'www.google.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

afterAll(async () => {
  await mongoose.connection.close()
})