import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ name, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {name}
    </button>
  )
}

const Statistic = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let totalClicks = good + neutral + bad
  let average = (good - bad) / totalClicks
  let positivePercentage = good / totalClicks * 100
  
  if (totalClicks === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={totalClicks} />
      <Statistic text="average" value={average} />
      <Statistic text="positive" value = {positivePercentage + " %"} />
    </div>
  )
}



const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => setGood(good + 1)
  const neutralClick = () => setNeutral(neutral + 1)
  const badClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={goodClick} />
      <Button name="neutral" handleClick={neutralClick} />
      <Button name="bad" handleClick={badClick} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
     </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)