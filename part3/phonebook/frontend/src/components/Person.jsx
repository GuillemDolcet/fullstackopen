const Person = ({id, name, number, handleDeletePerson}) => (
    <div>{name} {number} <button onClick={() => handleDeletePerson(id, name)}>delete</button></div>
)

export default Person