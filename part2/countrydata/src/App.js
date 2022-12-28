import { useState, useEffect } from "react"
import axios from "axios"
import Countries from "./components/Countries"
import Filter from "./components/Filter"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      <div>
        <Countries countries={countries} filter={filter} setFilter={setFilter} />
      </div>
    </div>
  )
}

export default App;
