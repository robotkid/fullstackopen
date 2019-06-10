import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
    )
  }

  const Part = ({part}) =>
        <p>{part.name} {part.exercises}</p>

  const Content = ({course}) =>
      course.parts.map(part => <Part key={part.id} part={part} />)
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
      )
    }
    
    const Total = ({course}) => {
      const total = course.parts.reduce((acc, cur) => {
        return (acc + cur.exercises)
      }, 0)

      return (
        <div>
          <p>
            <strong>total of {total} exercises</strong>
          </p>
        </div>
        )
      }
      
      const App = () => {
        const course = {
          name: 'Half Stack application development',
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            }
          ]
        }
        
        return (
          <div>
            <Course course={course} />
          </div>
          )
        }
        
        ReactDOM.render(<App />, document.getElementById('root'))