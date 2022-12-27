const Person = ({ person }) => (
    <div>{person.name} {person.number}</div>
)

const Persons = ({ personsToShow }) => (
    <>
        {personsToShow.map(person =>
            <Person key={person.id} person={person} />
        )}
    </>
)

export default Persons