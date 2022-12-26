const Course = ({ course }) => {
    const Header = () => <h2>{course.name}</h2>
    const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

    const Content = () => (
        <>
          {course.parts.map(part =>
            <Part key={part.id} part={part} />
          )}
        </>
      )

    const Total = () => {
        const sum = course.parts.reduce((s, p) => s = s + p.exercises, 0)
        return (
            <p><b>total of {sum} exercises</b></p>
        )
    }
      
    return (
      <>
        <Header/>
        <Content/>
        <Total/>
      </>
    )
  }

export default Course