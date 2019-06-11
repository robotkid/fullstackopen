import React from 'react'


const Person = ({name, number}) =>
  <p>{name} {number}</p>


const Persons = (props) =>
  props.persons.map(p => <Person key={p.name} name={p.name} number={p.number} />)


export default Persons