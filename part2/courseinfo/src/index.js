import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
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
        <h1>{course.name}</h1>
        <Content course={course} />
      </div>
      )
    }
    
    const Total = (props) => {
      const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
      return (
        <div>
          <p>
            Number of exercises {total}
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