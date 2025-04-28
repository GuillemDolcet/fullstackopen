const Form = ({onSubmit, newName, newNumber, handleNameChange, handleNumberChange}) => (
    <form onSubmit={onSubmit}>
        <div>
            name: <input value={newName} onChange={handleNameChange} required={true} />
        </div>
        <div>
            phone: <input value={newNumber} onChange={handleNumberChange} required={true} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default Form