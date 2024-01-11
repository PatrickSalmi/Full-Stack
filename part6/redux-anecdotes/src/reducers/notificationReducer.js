import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotificationMessage(state, action) {
      return action.payload
    },
    deleteNotification() {
      return null
    }
  }
})

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(setNotificationMessage(message))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, time * 1000)
  }
}

export const { setNotificationMessage, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer