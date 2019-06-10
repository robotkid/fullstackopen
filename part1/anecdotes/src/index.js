import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  let initialPoints = []
  for (let i=0; i<props.anecdotes.length; initialPoints[i++] = 0);
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(initialPoints)
  const [mostVotes, setMostVotes] = useState(0)

  const randomise = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  const vote = () => {
      const newPoints = points.slice()
      newPoints[selected] += 1
      setPoints(newPoints)
      if (newPoints[selected] > newPoints[mostVotes]) {
          setMostVotes(selected)
      }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {props.anecdotes[selected]}
      </p>
      <p>
          Has {points[selected]} votes
      </p>
      <button onClick={randomise}>
        next anecdote
      </button>
      <button onClick={vote}>
        vote
      </button>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[mostVotes]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)