const Header = (props) => {
  return(<h1>{props.name}</h1>)
}

const Content = (props) => {
  return(
    <ul>
        {props.parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises}/>
          )}
      </ul>
  )
}

const Part = (props) => {
  return(<li>{props.name} {props.exercises}</li>)
}

const Statistics = (props) => {
  const initial = 0;
  const sum = props.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises, initial
  );
  return(
    <b>total of {sum} exercises</b>
  )
}

const Course = (props) => {
  console.log(props);
  return(
    <div>
      <Header name={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Statistics parts={props.course.parts}/>
    </div>)
}
export default Course