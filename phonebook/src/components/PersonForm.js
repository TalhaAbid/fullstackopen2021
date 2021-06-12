import React from "react";

const PersonForm = ({ formSubmit, name, nameChange, number, numberChange }) => (
  <form onSubmit={formSubmit}>
    <div>
      name: <input value={name} onChange={nameChange} />
    </div>
    <div>
      number: <input value={number} onChange={numberChange} />
    </div>
    <div>
      <button type="submit"> add</button>
    </div>
  </form>
);

export default PersonForm;
