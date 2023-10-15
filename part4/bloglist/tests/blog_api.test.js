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

describe('when there is initially some blogs saved', () => {
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
})


describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'test',
      author: 'Arto',
      url: 'www.google.com',
      likes: 2
    }

    const token = await helper.authToken()

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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

    const token = await helper.authToken()

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blog = response.body.find(r => r.title === 'no likes')

    expect(blog.likes).toBe(0)

  })

  test('error for missing title or url', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      author: 'Pekka',
      url: 'www.google.com'
    }

    const token = await helper.authToken()

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtStart).toHaveLength(blogsAtEnd.length)

  })

  test('fails with status code 401 if token not provided', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'test',
      author: 'Arto',
      url: 'www.google.com',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtStart).toHaveLength(blogsAtEnd.length)

  })
})


describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const token = await helper.authToken()

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('failes with status code 400 if id is invalid', async () => {
    const token = await helper.authToken()

    await api
      .delete('/api/blogs/11111111111111')
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('updating existing blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedLikes = { ...blogToUpdate, likes: 10 }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedLikes)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(10)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedLikes = { ...blogToUpdate, likes: 10 }

    await api
      .put('/api/blogs/11111111111111')
      .send(updatedLikes)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(7)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})