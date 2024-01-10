import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    deleteNotification() {
      return null
    }
  }
})

export const { setNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer