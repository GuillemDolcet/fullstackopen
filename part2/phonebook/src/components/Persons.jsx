import Person from "./Person.jsx";

const Persons = ({persons, handleDeletePerson}) => (
    persons.map((person) => (
        <Person key={person.id} id={person.id} name={person.name} number={person.number} handleDeletePerson={handleDeletePerson}/>
    ))
)

export default Persons