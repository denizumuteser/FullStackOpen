import { useState } from 'react'

const Header = (props) => {
  return(
    <h1>{props.title}</h1>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const StatisticsLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const sum = props.stats[0]+props.stats[1]+props.stats[2];
  const avg = (props.stats[0]-props.stats[2])/sum;
  const positive = props.stats[0]/sum;
  
  if (sum < 1)
  {
    return(
      <p>No feedback given</p>
    )
  }

  return(
    <table>
      <tbody>
      <StatisticsLine text="good" value={props.stats[0]}/>
      <StatisticsLine text="neutral" value={props.stats[1]}/>
      <StatisticsLine text="bad" value={props.stats[2]}/>
      <StatisticsLine text="all" value={sum}/>
      <StatisticsLine text="average" value={avg}/>
      <StatisticsLine text="positive" value={positive+" %"}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onClickGood = () => {
    setGood(good+1)
  }
  const onClickNeutral = () => {
    setNeutral(neutral+1)
  }
  const onClickBad = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <Header title="give feedback"/>
      <Button onClick={onClickGood} text="good"/>
      <Button onClick={onClickNeutral} text="neutral"/>
      <Button onClick={onClickBad} text="bad"/>
      <Header title="statistics"/>
      <Statistics stats={[good,neutral,bad]}/>
    </div>
  )
}

export default App
