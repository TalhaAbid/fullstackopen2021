import React from "react";
import Country from "./Country";

const Countries = ({ countries, showAll, showHandler }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} show={true} />;
  }
  return (
    <div>
      {countries.map((country, index) => (
        <div key={country.capital}>
          <Country
            country={country}
            show={showAll[index]}
            index={index}
            showHandler={showHandler}
          />
          <button onClick={() => showHandler(index)}>
            {!showAll[index] ? "show" : "hide"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Countries;
