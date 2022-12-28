import CountryInfo from "./CountryInfo"

const CountriesList = ({ countriesToShow, setFilter }) => {
    return (
        <div>
            {countriesToShow.map(country =>
                <div key={country.name.official}>
                    {country.name.common}
                    <button onClick={() => setFilter(country.name.common)}>
                        show
                    </button>
                </div>
            )}
        </div>
    )
}

const Countries = ({ countries, filter, setFilter }) => {
    const countriesToShow = countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase()
        ))
    countriesToShow.sort((a, b) => a.name.common.localeCompare(b.name.common))

    if (countriesToShow.length > 10) {
        return (
            <div>too many matches, specify another filter</div>
        )
    }
    else if (countriesToShow.length === 1) {
        return (
            <CountryInfo country={countriesToShow[0]} />
        )
    }
    else {
        return (
            <CountriesList countriesToShow={countriesToShow} setFilter={setFilter} />
        )
    }
}

export default Countries