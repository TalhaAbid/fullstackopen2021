import React, { useState } from "react";

const App = (props) => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];
  const [selected, setSelected] = useState(0);
  let temp = Array.apply(null, new Array(anecdotes.length)).map(
    Number.prototype.valueOf,
    0
  );
  const [votes, setVotes] = useState(temp);

  // generate random number from 0 to 5
  const getRandom = () => Math.floor(Math.random() * anecdotes.length);

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] = copy[selected] + 1;
    setVotes(copy);
  };
  let max = votes.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0);
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p> <p>has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={() => setSelected(getRandom())}>next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[max]}</p>
    </div>
  );
};

export default App;
