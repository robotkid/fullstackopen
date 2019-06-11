import React from 'react'


const Header = ({name}) =>
  <h2>{name}</h2>


const Part = ({part}) =>
  <p>{part.name} {part.exercises}</p>


const Content = ({parts}) =>
  parts.map(part => <Part key={part.id} part={part} />)


const Total = ({parts}) => {
  const total =
    parts.reduce((acc, cur) => acc + cur.exercises, 0)

  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  )
}


const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}


export default Course