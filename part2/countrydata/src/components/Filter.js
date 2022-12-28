const Filter = ({ filter, handleFilter }) => {

    return (
        <div> <b>find countries</b>
            <input value={filter} onChange={handleFilter} />
        </div>
    )
}

export default Filter