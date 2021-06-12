import React from "react";

const Footer = ({ parts }) => {
  let total = parts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.exercises;
  }, 0);

  return <p>Number of Exercises {total}</p>;
};

export default Footer;
