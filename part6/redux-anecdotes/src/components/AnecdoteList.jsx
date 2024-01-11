import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

const Anecdote = ({ anecdote, handleClick }) => {
  Anecdote.propTypes = {
    anecdote: PropTypes.shape({
      content: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    }).isRequired,
    handleClick: PropTypes.func.isRequired
  }

  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      )}
    </>
  )
}

export default AnecdoteList