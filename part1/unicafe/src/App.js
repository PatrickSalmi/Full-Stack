import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad, ratings }) => {
  const sum = good + neutral + bad
  if (sum === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  return(
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <tr>
              <td>good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>all</td>
              <td>{sum}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{ratings/sum}</td>
            </tr>
            <tr>
            <td>positive</td>
            <td>{good/sum*100} %</td>
            </tr>
          </tbody>  
        </table>
      </div>
  ) 
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [ratings, setRating] = useState(0)

  const handleGoodRating = () => {
    setGood(good +1)
    setRating(ratings +1)
  }

  const handleNeutralRating = () => {
    setNeutral(neutral +1)
  }

  const handleBadRating = () => {
    setBad(bad +1)
    setRating(ratings -1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodRating} text="good" />
      <Button handleClick={handleNeutralRating} text="neutral" />
      <Button handleClick={handleBadRating} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} ratings={ratings}/>
    </div>
  )
}

export default App