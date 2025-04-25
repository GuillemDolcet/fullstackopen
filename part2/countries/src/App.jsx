import {useState, useEffect} from 'react'
import Searcher from "./components/Searcher.jsx";
import Countries from "./components/Countries.jsx";
import CountriesService from "./services/countries.jsx";

function App() {
    const [countries, setCountries] = useState([]);
    const [searcher, setSearcher] = useState('');

    useEffect(() => {
        CountriesService
            .getAll()
            .then(response => {
                setCountries(response.data)
            })
    }, []);

    const handleChangeSearcher = (e) => {
        setSearcher(e.target.value);
    }

    const countriesFiltered = countries.filter(country => {
       return country.name.common.toLowerCase().includes(searcher.toLowerCase());
    });

    return (
        <>
            <Searcher value={searcher} handleChange={handleChangeSearcher}/>
            <Countries countries={countriesFiltered} />
        </>
    )
}

export default App
