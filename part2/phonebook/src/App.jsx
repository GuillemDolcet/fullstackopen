import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import Form from "./components/Form.jsx";
import Persons from "./components/Persons.jsx";
import personsService from "./services/persons.jsx";

const App = () => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        personsService
            .getAll()
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
            personsService
                .create({name: newName, number: newNumber})
                .then(response => {
                    setPersons(persons.concat(response.data));
                    setNewName('');
                    setNewNumber('');
                })

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

    const handleDeletePerson = (personId, name) => {
        if (confirm(`Delete ${name}`)) {
            personsService
                .destroy(personId)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== personId))
                })
                .catch(error => {
                    alert("Error deleting person:", error);
                })
        }
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
            <Persons persons={personsFiltered} handleDeletePerson={handleDeletePerson}/>
        </div>
    )
}

export default App