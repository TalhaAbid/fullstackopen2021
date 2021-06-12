import React, { useState, useEffect } from "react";
import personServices from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("First Last");
  const [newNumber, setNewNumber] = useState("000-000-0000");
  const [filter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(true);

  useEffect(() => {
    personServices.getPersons().then((persons) => setPersons(persons));
  }, []);
  const handlePersonChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setNewFilter(event.target.value);
  const addPerson = (event) => {
    event.preventDefault();
    let personObj = {
      name: newName,
      number: newNumber,
    };
    let oldPerson = persons.filter((person) => person.name === newName);
    if (oldPerson.length > 0) {
      const yes = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (!yes) {
        return;
      }
      let updatedPerson = {
        ...oldPerson[0],
        number: newNumber,
      };
      personServices
        .personUpdate(updatedPerson)
        .then((returnedPerson) =>
          setPersons(
            persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            )
          )
        )
        .catch(() => {
          setError(true);
          setMessage(
            ` information of ${updatedPerson.name} has already been removed from server`
          );
          setTimeout(() => setMessage(null), 5000);
          setPersons(
            persons.filter((person) => person.id !== updatedPerson.id)
          );
        });
    } else {
      personServices
        .createPerson(personObj)
        .then((returnedPerson) => {
          setError(false);
          setMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => setMessage(null), 5000);
          setPersons(persons.concat(returnedPerson));
          return;
        })
        .catch((error) => {
          setError(true);
          setMessage(error.response.data.error);
          setTimeout(() => setMessage(null), 5000);
        });
    }
    setNewName("");
    setNewNumber("");
  };
  const handleDelete = (deletedPerson) => {
    const final = window.confirm(`Delete ${deletedPerson.name}`);
    if (!final) {
      return;
    }
    personServices
      .personDelete(deletedPerson.id)
      .then(() =>
        setPersons(persons.filter((person) => person.id !== deletedPerson.id))
      );
  };
  let filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        formSubmit={addPerson}
        name={newName}
        nameChange={handlePersonChange}
        number={newNumber}
        numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons handleDelete={handleDelete} persons={filteredPersons} />
    </div>
  );
};

export default App;
