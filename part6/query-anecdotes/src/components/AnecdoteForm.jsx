import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecodteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      if ( error && error.response.status === 400 ) {
        notificationDispatch({
          type: 'SET_NOTIFICATION',
          payload: error.response.data.error
        })
        setTimeout(() => {
          notificationDispatch({type: 'NULL'})
        }, 5000)
      }
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecodteMutation.mutate({ content, votes: 0 })
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: `anecdote created '${content}'`
    })
    setTimeout(() => {
      notificationDispatch({type: 'NULL'})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
