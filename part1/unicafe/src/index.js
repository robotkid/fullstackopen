import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const FeedbackButtons = ({props}) => {
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={props[0].handleClick}>
        {props[0].name}
      </button>
      <button onClick={props[1].handleClick}>
        {props[1].name}
      </button>
      <button onClick={props[2].handleClick}>
        {props[2].name}
      </button>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const buttons = [
    {
      name: "good",
      handleClick: () => setGood(good + 1)
    },
    {
      name: "neutral",
      handleClick: () => setNeutral(neutral + 1)
    },
    {
      name: "bad",
      handleClick: () => setBad(bad + 1)
    }
  ]
  return (
    <div>
      <FeedbackButtons props={buttons} />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)