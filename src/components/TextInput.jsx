import React from 'react';

const TextInput = ({ addColumn, addItem, columnIndex }) => {
  const onSubmit = (event) => {
    const form = event.target;
    event.preventDefault();
    console.log(columnIndex)
    const value = form.input.value.trim();
    addColumn ? addColumn(value) : addItem(columnIndex, value);
    form.reset();
  };


    return (
      <form onSubmit={onSubmit}>
        {console.log("ajouter une colonne")}
        <input
          type="text"
          className="TextForm__input"
          name="input"
          placeholder={"New ..."}
          autoComplete="off"
        />
      </form>
    );
}

export default TextInput;
