import React from 'react'


const Person = ({person, deleteHandler}) =>
  <p>{person.name} {person.number} <button onClick={deleteHandler(person.id)}>delete</button></p>


const Persons = (props) =>
  props.persons.map(p => <Person
                            key={p.name}
                            person={p}
                            deleteHandler={props.deleteHandler} />)


export default Persons