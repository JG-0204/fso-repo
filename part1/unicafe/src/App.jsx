import { useState } from 'react';

const Button = (props) => {
  return <button onClick={props.handler}>{props.text}</button>;
};

const Statistics = ({ feedbacks }) => {
  let totalFeedbacks = feedbacks.good + feedbacks.neutral + feedbacks.bad;
  let average = (feedbacks.good - feedbacks.bad) / totalFeedbacks;
  let positivePercent = `${(feedbacks.good / totalFeedbacks) * 100}%`;

  if (totalFeedbacks === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <Data text="good" value={feedbacks.good} />
        <Data text="neutral" value={feedbacks.neutral} />
        <Data text="bad" value={feedbacks.bad} />
        <Data text="all" value={totalFeedbacks} />
        <Data text="average" value={average} />
        <Data text="positive" value={positivePercent} />
      </tbody>
    </table>
  );
};

const Data = (props) => (
  <tr>
    <td>
      {props.text} {props.value}
    </td>
  </tr>
);

const App = () => {
  // save clicks of each button to its own state
  const [feedbacks, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGoodClicks = () => {
    const newFeedback = {
      ...feedbacks,
      good: feedbacks.good + 1,
    };

    setFeedback(newFeedback);
  };

  const handleNeutralClicks = () => {
    const newFeedback = {
      ...feedbacks,
      neutral: feedbacks.neutral + 1,
    };

    setFeedback(newFeedback);
  };

  const handleBadClicks = () => {
    const newFeedback = {
      ...feedbacks,
      bad: feedbacks.bad + 1,
    };

    setFeedback(newFeedback);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" handler={handleGoodClicks} />
      <Button text="neutral" handler={handleNeutralClicks} />
      <Button text="bad" handler={handleBadClicks} />
      <h2>Statistics</h2>
      <Statistics feedbacks={feedbacks} />
    </div>
  );
};

export default App;
