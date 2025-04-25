const Country = ({country, showAllInfo}) => {
    if (showAllInfo) {
        return (
            <div>
                <h1>{country.name.common}</h1>
                <div>
                    <div>Capital {country.capital[0]}</div>
                    <div>Area {country.area}</div>
                </div>
                <h1>Languages</h1>
                <div>
                    <ul>
                        {
                            Object.values(country.languages).map((language) => (
                                <li key={language}>{language}</li>
                            ))
                        }
                    </ul>
                </div>
                <img src={country.flags.png} alt={country.name}/>
            </div>
        )
    }

    return (
        <div>{country.name.common}</div>
    )
}

export default Country