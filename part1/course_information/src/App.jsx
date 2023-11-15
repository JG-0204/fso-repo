const Header = ({ course }) => (
  <header>
    <h1>{course}</h1>
  </header>
);

const Part = ({ title, count }) => (
  <div>
    <h3>Topic: {title} </h3>
    <p>Exercises: {count}</p>
  </div>
);

const Content = ({ parts }) => (
  <div>
    <Part title={parts[0].name} count={parts[0].exercises} />
    <Part title={parts[1].name} count={parts[1].exercises} />
    <Part title={parts[2].name} count={parts[2].exercises} />
  </div>
);

const Total = ({ parts }) => {
  let total = 0;
  parts.forEach((part) => {
    total += part.exercises;
  });
  return (
    <div>
      <h3>Total Exercises: {total}</h3>
    </div>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
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
  ];

  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  );
};

export default App;
