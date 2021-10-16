import React from 'react';

const TextInput = (
    // {placeholder, onSubmit }
    ) => {
  const onSubmit = (event) => {
    const form = event.target;
    event.preventDefault();

    const value = form.input.value.trim();
    if (!value) return;

    //onSubmit(value);
    form.reset();
  };

    return (
      <form
      //onSubmit={onSubmit} 
      //ref={node => (form = node)}
      >
        <input
          type="text"
          className="item-title"
          name="input"
          placeholder={"test brk"}
          //placeholder={placeholder}
          autoComplete="off"
        />
      </form>
    );
}

//export default TextInput;
