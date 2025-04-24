import { useState } from 'react'
import Number from "./components/Number.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()

        if (!persons.find(o => o.name === newName)) {
            setPersons(persons => [...persons, {name: newName}])
            return;
        }

        alert(`${newName} is already added to phonebook`)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input value={newName} onChange={e => setNewName(e.target.value)} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {
                persons.map((person) => (
                    <Number key={person.name} number={person.name} />
                ))
            }
        </div>
    )
}

export default App