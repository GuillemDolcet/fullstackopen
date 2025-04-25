import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import Form from "./components/Form.jsx";
import Persons from "./components/Persons.jsx";
import personsService from "./services/persons.jsx";
import Notification from "./components/Notification.jsx";

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
    const [notification, setNotification] = useState({text: null, success: null})

    const onSubmit = (event) => {
        event.preventDefault()

        const existingPerson = persons.find(p => p.name === newName);

        if (! existingPerson) {
            personsService
                .create({name: newName, number: newNumber})
                .then(response => {
                    setPersons(persons.concat(response.data));
                    setNotification({text: `Added ${response.data.name}`, success: true})
                    setTimeout(() => {
                        setNotification({text: null, success: null})
                    }, 5000)
                    setNewName('');
                    setNewNumber('');
                })

            return;
        }

        if (confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)) {
            personsService
                .update(existingPerson.id, {name: existingPerson.name, number: newNumber})
                .then(response => {
                    setPersons(persons.map(p =>
                        p.id !== existingPerson.id ? p : response.data
                    ));
                    setNotification({text: `Updated ${response.data.name}`, success: true})
                    setTimeout(() => {
                        setNotification({text: null, success: null})
                    }, 5000)
                    setNewName('');
                    setNewNumber('');
                })
        }
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
        if (confirm(`Delete ${name} ?`)) {
            personsService
                .destroy(personId)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== personId))
                    setNotification({text: `Deleted ${name}`, success: true})
                    setTimeout(() => {
                        setNotification({text: null, success: null})
                    }, 5000)
                })
                .catch(() => {
                    setNotification({text: `Information of ${name} has already been removed from server`, success: false})
                    setTimeout(() => {
                        setNotification({text: null, success: null})
                    }, 5000)
                })
        }
    }

    const personsFiltered = persons.filter(
        person => person.name.toLowerCase().includes(filterName.toLowerCase())
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification text={notification.text} success={notification.success} />
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