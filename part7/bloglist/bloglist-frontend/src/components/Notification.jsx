import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const notificationStyle = {
    color: notification ? notification.color : 'transparent',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return notification ? (
    <div style={notificationStyle} className="notification">
      {notification.message}
    </div>
  ) : null
}

export default Notification