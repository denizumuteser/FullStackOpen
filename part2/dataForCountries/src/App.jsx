import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryInfo = ({country}) => {
  
  const languages = Object.values(country.languages) 
  console.log('lang', languages)
  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital[0]}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map((language)=>
          <li key={language}>{language}</li>
        )}
      </ul>
      <img src={country.flags.png || ""}/>
    </div>
    
  )
}

const Results = ({countries, showHandler}) => {
  if (countries.length>10) return <p>Too many matches, specify another filter</p>
  if (countries.length===1)
  {
    console.log(countries[0])
    return <CountryInfo country={countries[0]}/>
  }
  return (
      <ul>
        {countries.map((country,i)=>
          <li key={i}>{country.name.common}<button value={country.name.common} onClick={showHandler}>show</button></li>
          )}
      </ul>
  )
}

function App() {
  const [newCountry, setNewCountry] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response=>{
      console.log('countries recieved', response)
      setCountries(response.data)
    })
  },[])

  const changeHandler = (event) => {
    console.log(event.target.value)
    setNewCountry(event.target.value)
  }

  const showHandler = (event) => {
    setNewCountry(event.target.value)
  }

  let countriesToShow = []
  if (countries)
  {
    countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(newCountry.toLowerCase()))
  }

  return (
    <div>
      find countries: <input value={newCountry} onChange={changeHandler}/>
      <Results showHandler={showHandler} countries={countriesToShow}/>
    </div>
  )
}

export default App
