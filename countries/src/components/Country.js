import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country, show }) => {
  const [weather, setWeather] = useState({});
  const baseUrl =
    "http://api.weatherstack.com/current?access_key=70fff816e37df615801c50fe80486257&query=";
  useEffect(() => {
    axios
      .get(baseUrl + country.capital)
      .then((response) => setWeather(response.data));
  }, [country.name]);
  console.log(weather);
  if (show) {
    return (
      <>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <h2>languages</h2>
        <ul>
          {country.languages.map((language) => (
            <li key={country.name}>{language.name}</li>
          ))}
        </ul>
        <img alt="" src={country.flag} width={200} height={200} />
        <h3>Weather in {country.capital}</h3>
        <p></p>
      </>
    );
  }
  return <p>{country.name}</p>;
};

export default Country;
