const Filter = ({onChange, value}) => (
    <div>
        filter shown with <input value={value} type="text" onChange={onChange} />
    </div>
)

export default Filter