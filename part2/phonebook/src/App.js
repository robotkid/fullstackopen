import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchItem, setSearchItem ] = useState('')

  const personsToShow =
    persons.filter(p => p.name.toUpperCase().includes(searchItem.toUpperCase()))

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchItem(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchItem={searchItem} changeHandler={handleSearchChange} />
      
      <h3>add a new</h3>

      <PersonForm 
        formSubmitHandler={addName}
        nameValue={newName} nameChangeHandler={handleNameChange}
        numberValue={newNumber} numberChangeHandler={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} />

    </div>
  )
}

export default App