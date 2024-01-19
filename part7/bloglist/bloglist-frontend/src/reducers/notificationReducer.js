import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotificationMessage(state, action) {
      return {
        message: action.payload.message,
        color: action.payload.color,
      }
    },
    deleteNotification() {
      return null
    }
  }
})

export const setNotification = (message, time, error = false) => {
  return async dispatch => {
    const color = error ? 'red' : 'green'
    dispatch(setNotificationMessage({ message, color }))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, time * 1000)
  }
}

export const { setNotificationMessage, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer