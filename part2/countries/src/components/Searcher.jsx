const Searcher = ({handleChange, value}) => (
    <div>
        find countries: <input type="text" value={value} onChange={handleChange}/>
    </div>
)

export default Searcher;