import { useState } from 'react'
import Filter from "./components/Filter.jsx";
import Form from "./components/Form.jsx";
import Persons from "./components/Persons.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);

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