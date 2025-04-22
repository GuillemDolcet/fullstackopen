import { useState } from 'react'

const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const StatisticsLine = ({value, text}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad;
    const totalPunctuation = good + bad * -1;

    if (total > 0) {
        return (
            <>
                <table>
                    <tbody>
                        <StatisticsLine value={good} text={"good"} />
                        <StatisticsLine value={neutral} text={"neutral"} />
                        <StatisticsLine value={bad} text={"bad"} />
                        <StatisticsLine value={totalPunctuation / total} text={"average"} />
                        <StatisticsLine value={good / total * 100 + "%"} text={"positive"} />
                    </tbody>
                </table>
            </>
        )
    }

    return (
        <>
            <p>No feedback given</p>
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <div>
                <Button onClick={() => setGood(good + 1)} text={"good"} />
                <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
                <Button onClick={() => setBad(bad + 1)} text={"bad"} />
            </div>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App