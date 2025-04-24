import { useState } from 'react'
import Number from "./components/Number.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', phone: '666666666' }
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()

        if (!persons.find(o => o.name === newName || o.phone === newPhone)) {
            setPersons(persons => [...persons, {name: newName, phone: newPhone}])
            return;
        }

        alert(`${newName} is already added to phonebook`)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input value={newName} onChange={e => setNewName(e.target.value)} required={true} />
                </div>
                <div>
                    phone: <input value={newPhone} onChange={e => setNewPhone(e.target.value)} required={true} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {
                persons.map((person) => (
                    <Number key={person.name} number={person.name} phone={person.phone} />
                ))
            }
        </div>
    )
}

export default App