const Person = ({ person }) => (
    <div>{person.name} {person.number}</div>
)

const Persons = ({ persons, filter }) => {
    const personsToShow = persons.filter(person =>
            person.name.toLowerCase().includes(filter.toLowerCase()
            ))

    return (
        <>
            {personsToShow.map(person =>
                <Person key={person.id} person={person} />
            )}
        </>
    )
}

export default Persons