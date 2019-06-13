import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchItem, setSearchItem ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ isError, setIsError ] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const personsToShow =
    persons.filter(p => p.name.toUpperCase().includes(searchItem.toUpperCase()))

  const updateNumber = (index) => {
    personService
      .update(persons[index].id, {...persons[index], number:newNumber})
      .then( (returnedPerson) => {
        const newPersons = [...persons]
        newPersons[index] = returnedPerson
        setPersons(newPersons)
        notify(`Changed number for ${newName}`, false)
      })
      .catch(error => {
        notify(`${newName} was already removed from the server`, true)
      })
  }

  const addName = (event) => {
    event.preventDefault()
    const replaceMessage = `${newName} is already in the phonebook. Replace the old number with a new one?`
    const existingIndex = persons.findIndex(p => p.name === newName)
    if (existingIndex >= 0 && window.confirm(replaceMessage)) {
      updateNumber(existingIndex)
    }
    else {
      const newPerson = {name: newName, number: newNumber}
      
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          notify(`Added ${returnedPerson.name}`, false)
        })
    }
  }

  const notify = (message, error) => {
    setNotificationMessage(message)
    setIsError(error)
    setTimeout(() => setNotificationMessage(null), 3000)    
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

  const handleDelete = (id) => () => {
    const personIndex = persons.findIndex(p => p.id === id)
    const personName = persons[personIndex].name
    if (window.confirm(`Delete ${personName}`))
    personService.del(id)
      .then( () => {  
        const updatedPersons = [...persons]
        updatedPersons.splice(personIndex, 1)
        setPersons(updatedPersons)
        notify(`Deleted ${personName}`, false)
      })
  }

  return (
    <div>
      <Notification message={notificationMessage} error={isError} />

      <h2>Phonebook</h2>

      <Filter searchItem={searchItem} changeHandler={handleSearchChange} />
      
      <h3>add a new</h3>

      <PersonForm 
        formSubmitHandler={addName}
        nameValue={newName} nameChangeHandler={handleNameChange}
        numberValue={newNumber} numberChangeHandler={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} deleteHandler={handleDelete} />

    </div>
  )
}

export default App