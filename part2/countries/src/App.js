import React, {useState, useEffect} from 'react';
import axios from 'axios'

function Countries({countries}) {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (countries.length > 1) {
    return countries.map(c => <p key={c.name}>{c.name}</p>)
  }
  else if (countries.length === 0) {
    return <p>Nothing to show</p>
  }

  const country = countries[0]
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} width="150" />
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filterString, setFilterString] = useState("")
  const countriesToShow =
    countries.filter(c => c.name.toUpperCase().includes(filterString.toUpperCase()))

  useEffect(()  => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }

  return (
    <div>
      <p>find {countriesToShow.length} countries <input value={filterString} onChange={handleFilterChange}/></p>
      <Countries countries={countriesToShow} />
    </div>
  );
}

export default App;
