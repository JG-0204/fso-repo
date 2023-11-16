import { useState } from 'react';

const Button = (props) => <button onClick={props.handler}>{props.text}</button>;

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);

  const [voteCount, setVoteCount] = useState(new Array(8).fill(0));

  const maxVotes = voteCount.indexOf(Math.max(...voteCount));

  const generateRandomNumber = () =>
    Math.floor(Math.random() * (anecdotes.length - 1 - 0 + 1)) + 0;

  const nextAnecdoteHandler = () => setSelected(generateRandomNumber());

  const voteHandler = () => {
    const copy = [...voteCount];
    copy[selected] += 1;

    setVoteCount(copy);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {voteCount[selected]} votes</p>
      <Button handler={voteHandler} text="Vote" />
      <Button handler={nextAnecdoteHandler} text="Next Anecdote" />

      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[maxVotes]}</p>
      <p>has {voteCount[maxVotes]} votes</p>
    </div>
  );
};

export default App;
