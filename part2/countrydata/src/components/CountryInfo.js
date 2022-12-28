import Weather from "./Weather"

const CountryInfo = ({ country }) => {
    const languages = []
    for (const [key, value] of Object.entries(country.languages)) {
        languages.push([key, value])
    }
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>
            <h3>Languages:</h3>
            <ul>
                {languages.map(language =>
                    <li key={language[0]}>
                        {language[1]}
                    </li>
                )}
            </ul>
            <img src={country.flags.png} />
            <Weather country={country} />
        </div>
    )
}

export default CountryInfo