import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotificationMessage(state, action) {
      return {
        message: action.payload.message,
        variant: action.payload.variant,
      }
    },
    deleteNotification() {
      return null
    }
  }
})

export const setNotification = (message, time, error = false) => {
  return async dispatch => {
    const variant = error ? 'danger' : 'success'
    dispatch(setNotificationMessage({ message, variant }))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, time * 1000)
  }
}

export const { setNotificationMessage, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer