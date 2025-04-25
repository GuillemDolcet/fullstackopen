import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import Form from "./components/Form.jsx";
import Persons from "./components/Persons.jsx";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then(response => {
                setPersons(response.data)
            })
    }, []);

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()

        if (!persons.find(o => o.name === newName || o.number === newNumber)) {
            setPersons(persons => [...persons, {name: newName, number: newNumber}])
            return;
        }

        alert(`${newName} is already added to phonebook`)
    }

    const handleFilterNameChange = (event) => {
        setFilterName(event.target.value)
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const personsFiltered = persons.filter(
        person => person.name.toLowerCase().includes(filterName.toLowerCase())
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onChange={handleFilterNameChange} value={filterName}></Filter>
            <Form
                onSubmit={onSubmit}
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons={personsFiltered} />
        </div>
    )
}

export default App