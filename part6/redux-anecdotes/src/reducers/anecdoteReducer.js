import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    anecdoteVote(state, action) {
      const updatedAnecdote = action.payload
      const anecdote = state.find(a => a.id === updatedAnecdote.id)
      anecdote.votes = updatedAnecdote.votes
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(anecdote)
    dispatch(anecdoteVote(updatedAnecdote))
  }
}

export const { anecdoteVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer