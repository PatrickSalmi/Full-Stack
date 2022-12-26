const Header = ({ name }) => (
  <h2>{name}</h2>
)

const Part = ({ part }) => (
  <p>{part.name} {part.exercises}</p>
)

const Content = ({ parts }) => (
  <>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </>
)

const Total = ({ parts }) => {
  const sum = parts.reduce((s, p) => s = s + p.exercises, 0)
  return (
    <p><b>total of {sum} exercises</b></p>
  )
}

const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)


export default Course