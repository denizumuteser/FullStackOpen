import { useEffect, useState } from 'react'
import personService from './services/persons'

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

const Persons = ({persons,deleteHandler}) => {
  return(
    <ul>
        {persons.map((person)=>
          <li key={person.id}>{person.name} {person.number} <button value={person.id} onClick={deleteHandler}>delete</button></li>
          )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(()=>{
    personService.getAll().then(response=>{
      setPersons(response)
    })
  },[])

  const addNew = (event) => {
    event.preventDefault()
    //check if exists
    const existing = persons.find(person => person.name === newName)
    if(existing)
    {
      if (existing.number !== newNumber)
      {
        if(!window.confirm("Already added to phonebook, replace the old number with new one?")){return}
        //update number
        console.log("updating number")
        personService.update(existing.id, {name: existing.name, number:newNumber}).then(response=>{
          setPersons(persons.map(person=> person.id!==existing.id ? person : response))
          console.log("updated", existing.id)
          setNewName("")
          setNewNumber("")
        })
        
        return
      }
      else
      {
        alert(`${newName} is already added to phonebook`)
        return
      }
      
    }
    //else
    personService.create({name:newName, number:newNumber}).then(response=>{
      setPersons(persons.concat(response))
      setNewName("")
      setNewNumber("")
    }
    )
    
  }
  
  const deleteHandler = (event) => {
    if(!window.confirm("Are you sure?")){return}
    personService.deleteId(event.target.value).then(response=>{
      console.log('deleted id:', event.target.value);
      const newPersons = persons.filter(person=>person.id !== parseInt(event.target.value))
      console.log(newPersons)
      setPersons(newPersons)
    })
    
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
      <Persons persons={personsToShow} deleteHandler={deleteHandler}/>
    </div>
  )
}

export default App