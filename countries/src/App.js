import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";

import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState([]);
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const countriesToShow =
    search === ""
      ? []
      : countries.filter((country) =>
          country.name.toLowerCase().includes(search.toLowerCase())
        );
  const arr = new Array(countriesToShow.length).fill(false);
  const showHandler = (i) => {
    const copy = showAll.length === 0 ? arr.slice() : showAll.slice();
    copy[i] = !copy[i];
    setShowAll(copy);
    return;
  };
  return (
    <div>
      <p>
        find countries{" "}
        <input type="text" value={search} onChange={handleSearchChange} />
      </p>
      <Countries
        countries={countriesToShow}
        showHandler={showHandler}
        showAll={showAll}
      />
    </div>
  );
};
export default App;
