const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
    <div>
        <Part part={props.parts[0]} />
        <Part part={props.parts[1]} />
        <Part part={props.parts[2]} />
    </div>
)

const Part = (props) => (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
)

const Total = (props) => <p><b>Number of exercises {props.total}</b></p>

const Course = ({course}) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total total={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
)

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
            },
            {
                name: 'State of a component',
                exercises: 14,
            },
        ],
    }

    return <Course course={course} />
}

export default App