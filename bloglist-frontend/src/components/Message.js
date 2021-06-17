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
const error = {
  color: "red",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};

const Message = ({ message }) => {
  if (message.message === null || message.error === null) {
    return <></>;
  }
  return <div style={message.error ? error : good}>{message.message}</div>;
};

export default Message;
