import { useState } from 'react'

const Display = (props) => {
  return(
    <div>
      <h1>{props.title}</h1>
      <p>{props.anecdote}</p>
      <p>has {props.vote} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const [mostVoted, setMostVoted] = useState(0)

  const onClickHandle = () => {
    const number = Math.floor(Math.random() * anecdotes.length);
    setSelected(number)
  }

  const onVote = () => {
    const copy = [...votes]
    copy[selected]+=1
    setVotes(copy)
    setMostVoted(getMostVoted(copy))
  }

  const getMostVoted = (arr) => {
    let max = 0
    let selection = 0
    for (let i = 0 ; i < arr.length ; i++)
    {
      if (arr[i]>max)
      {selection=i
        max=arr[i]
      }
    }
    console.log("max",selection)
    return selection
  }

  return (
    <div>
      <Display title="Anecdote of the day" anecdote={anecdotes[selected]} vote={votes[selected]}/>
      <button onClick={onVote}>vote</button>
      <button onClick={onClickHandle}>next anectode</button>
      <Display title="Anecdote with most votes" anecdote={anecdotes[mostVoted]} vote={votes[mostVoted]}/>
      
    </div>
  )
}

export default App
