import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import { initilizeUsers } from './userReducer'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    likeBlog(state, action) {
      const updatedBlog = action.payload
      return state
        .map(blog =>
          (blog.id !== updatedBlog.id
            ? blog
            : { ...blog, likes: updatedBlog.likes })
        )
    },
    delBlog(state, action) {
      const BlogToDelete = action.payload
      return state.filter(b => b.id !== BlogToDelete.id)
    }
  }
})

export const initilizeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(appendBlog(newBlog))
      dispatch(initilizeUsers())
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author ? newBlog.author : '-'} added`, 5))
    } catch (error) {
      dispatch(setNotification('Missing fields', 5, true))
    }
  }
}

export const addLike = blog => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.addLike(blog)
      dispatch(likeBlog(updatedBlog))
    } catch (error) {
      dispatch(setNotification('Something went wrong', 5, true))
    }
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        const deletedBlog = await blogService.deleteBlog(blog.id)
        dispatch(delBlog(deletedBlog))
        dispatch(initilizeBlogs())
      }
    } catch (error) {
      dispatch(setNotification('Unable to delete blog', 5, true))
    }
  }
}

export const { setBlogs, appendBlog, likeBlog, delBlog } = blogSlice.actions
export default blogSlice.reducer