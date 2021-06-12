import React, { useState } from "react";

const Statisitc = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td> {value}</td>
  </tr>
);
const Statistics = ({ good, bad, neutral }) => {
  let total = good + bad + neutral;
  if (total === 0) {
    return <p>No Feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <Statisitc text="good" value={good} />
        <Statisitc text="neutral" value={neutral} />
        <Statisitc text="bad" value={bad} />
        <Statisitc text="total" value={total} />
        <Statisitc
          text="average"
          value={Math.abs((good - bad) / (good + neutral + bad))}
        />
        <Statisitc
          text="positive"
          value={(good / (good + neutral + bad)) * 100}
        />{" "}
      </tbody>
    </table>
  );
};
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedback = (setFeedback, feedback) => () => {
    setFeedback(feedback + 1);
  };
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleFeedback(setGood, good)} text="good" />
      <Button
        handleClick={handleFeedback(setNeutral, neutral)}
        text="neutral"
      />
      <Button handleClick={handleFeedback(setBad, bad)} text="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};
export default App;
