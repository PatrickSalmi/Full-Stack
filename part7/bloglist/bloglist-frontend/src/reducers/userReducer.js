import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import userService from '../services/users'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'users',
  initialState: { currentUser: null, users: [] },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload
    },
    removeLogin(state, action) {
      state.currentUser = null
    }
  }
})

export const initilizeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const logIn = userObject => {
  return async dispatch => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setCurrentUser(user))
      return true
    } catch (error) {
      dispatch(setNotification('Wrong username or password', 5, true))
      return false
    }
  }
}

export const checkUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setCurrentUser(user))
    }
  }
}

export const logOut = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(removeLogin())
  }
}

export const { setUsers, setCurrentUser, removeLogin } = userSlice.actions
export default userSlice.reducer