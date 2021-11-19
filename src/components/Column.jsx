import React from "react";
import TextInput from "./TextInput";

const Column = ({ isOver, addItem, columnIndex, children }) => {
    const className = isOver ? " highlight-region" : "";

    return (
        <div 
            className={`col${className}`}
        >
            {children}
            <TextInput addItem={addItem} columnIndex={columnIndex}/>
        </div>
    );
};

export default Column;