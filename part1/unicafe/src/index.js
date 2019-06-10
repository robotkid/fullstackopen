import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const FeedbackButtons = ({buttons}) => {
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={buttons[0].handleClick}>
        {buttons[0].name}
      </button>
      <button onClick={buttons[1].handleClick}>
        {buttons[1].name}
      </button>
      <button onClick={buttons[2].handleClick}>
        {buttons[2].name}
      </button>
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let totalClicks = good + neutral + bad
  let average = (good - bad) / totalClicks
  let positivePercentage = good / totalClicks * 100
  
  return (
    <div>
      <p>all {totalClicks}</p>
      <p>average {average}</p>
      <p>positive {positivePercentage} %</p>
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
      <FeedbackButtons buttons={buttons} />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <Statistics good={good} neutral={neutral} bad={bad}/>
     </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)