import { useState } from 'react'

const Filter = (props) => {
  return(
    <div>
      filter show with <input onChange={props.onChange} value={props.value}/>
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <form>
    <div>
      name: <input onChange={props.onChangeName} value={props.name}/>
      number: <input onChange={props.onChangeNumber} value={props.number}/>
    </div>
    <div>
      <button type="submit" onClick={props.onAdd}>add</button>
    </div>
  </form>
  )
}

const Persons = ({persons}) => {
  return(
    <ul>
        {persons.map((person)=>
          <li key={person.name}>{person.name} {person.number}</li>
          )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addNew = (event) => {
    event.preventDefault()
    //check if exists
    if(persons.find(person => person.name === newName))
    {
      alert(`${newName} is already added to phonebook`)
      return
    }
    //else
    setPersons(persons.concat({name:newName, number:newNumber}))
    setNewName("")
    setNewNumber("")
  }
  
  const handleNameChange = (event) =>
  {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>
  {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) =>
  {
    if (event.target.value === '') setShowAll(true)
    else setShowAll(false)

    setNewSearch(event.target.value)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleSearchChange} value={newSearch}/>
      <h3>Add New</h3>
      <PersonForm onAdd={addNew} onChangeName={handleNameChange} onChangeNumber={handleNumberChange} name={newName} number={newNumber}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App