const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <>
          <Header key={course.id} courseName={course.name} />
          <Content courseParts={course.parts} />
        </>
      ))}
    </>
  );
};

const Header = ({ courseName }) => <h2>{courseName}</h2>;

const Content = ({ courseParts }) => {
  const exercises = courseParts.map((part) => part.exercises);
  const exercisesCount = exercises.reduce((accu, curr) => accu + curr);

  return (
    <div>
      {courseParts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <h3>total of {exercisesCount} exercises</h3>
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default Course;
