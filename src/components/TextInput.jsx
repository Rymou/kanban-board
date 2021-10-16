import React from 'react';

const TextInput = ({ onSubmit } ) => {


  const _onSubmit = (event) => {
    const form = event.target;
    event.preventDefault();

    const value = form.input.value.trim();
    if (!value) return;
    console.log("TextInput "+value);
    onSubmit(value);
    form.reset();
  };

    return (
      <form
      
      onSubmit={_onSubmit} 
      //ref={node => (form = node)}
      >
        <input
          type="text"
          className="item"
          name="input"
          placeholder={"Add new task"}
          //placeholder={placeholder}
          autoComplete="off"
        />
      </form>
    );
}

export default TextInput;
