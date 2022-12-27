import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [showAll, setShowAll] = useState(false)
  const [filter, setfilter] = useState("")

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setfilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const nameCheck = !persons.some(p => p.name.toLowerCase() === newName.toLowerCase())
    if (nameCheck) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")

    } else {
      alert(`${newName} is already added to the phonebook`)
      setNewName("")
      setNewNumber("")
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase()
      ))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>name:
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div> <button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Persons personsToShow={personsToShow} />
      </div>
    </div>
  )
}

export default App