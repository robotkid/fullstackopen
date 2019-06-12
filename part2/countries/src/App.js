import React, {useState, useEffect} from 'react';
import axios from 'axios'

function CountryDetail({country, weather}) {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} width="150" />
      <h3>weather</h3>
      <p>temperature: {weather.temp_c} celcius</p>
      {weather && <img src={weather.condition.icon} alt="weather conditions icon" />}
      <p>wind: {weather.wind_kph} {weather.wind_dir}</p>
    </div>
  )
}

function CountryList({countries, buttonHandler}) {
  return countries.map(c =>
    <p key={c.name}>{c.name} <button onClick={buttonHandler(c)}>show</button></p>)
}

function Countries({countries, country, buttonHandler}) {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (countries.length === 0) {
    return <p>Nothing to show</p>
  }

  if (countries.length === 1) country = countries[0]
  

  return (
    <div>
      {countries.length > 1 &&
        <CountryList countries={countries} buttonHandler={buttonHandler} />
      }
    </div>
  )
}


function App() {
  const [countries, setCountries] = useState([])
  const [filterString, setFilterString] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countriesToShow, setCountriesToShow] = useState([])
  const [weather, setWeather] = useState("")

  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (selectedCountry == null) return
    const latinisedCapital = selectedCountry.capital.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    axios
      .get(`https://api.apixu.com/v1/current.json?q=${latinisedCapital}&key=ca5648233f0b4cb78d070650191206`)
      .then(response => {
        setWeather(response.data['current'])
      })
  }, [selectedCountry])


  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
    const newCountries = countries.filter(c => c.name.toUpperCase().includes(event.target.value.toUpperCase()))
    setCountriesToShow(newCountries)
    if (newCountries.length === 1) {
      setSelectedCountry(newCountries[0])
    }
  }

  const displayCountry = (country) => () => {
    //debugger
    setSelectedCountry(country)
  }

  return (
    <div>
      <p>find {countriesToShow.length} countries <input value={filterString} onChange={handleFilterChange}/></p>
      <Countries countries={countriesToShow} country={selectedCountry} buttonHandler={displayCountry} />
      {selectedCountry && <CountryDetail country={selectedCountry} weather={weather}/>}
    </div>
  );
}

export default App;
