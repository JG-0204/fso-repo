const Person = ({ name, number, event }) => (
  <p>
    {name} {number}
    <button onClick={event}>Delete</button>
  </p>
);

export default Person;
