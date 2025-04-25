import Country from "./Country.jsx";

const Countries = ({countries}) => {
    if (countries.length === 0) {
        return null
    }

    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    const showAllInfo = countries.length === 1;

    return (
        <div>
            {
                countries.map(country => (
                    <Country country={country} key={country.name.common} showAllInfo={showAllInfo} />
                ))
            }
        </div>
    )
}

export default Countries