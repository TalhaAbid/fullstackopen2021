import React from "react";

const good = {
  color: "green",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};
const errorS = {
  color: "red",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};

const Notification = ({ message, error }) => {
  if (message === null) {
    return <p></p>;
  }
  return <div style={error ? errorS : good}>{message}</div>;
};

export default Notification;
