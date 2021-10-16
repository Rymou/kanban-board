import React from "react";

const Column = ({ isOver, children }) => {
    const className = isOver ? " highlight-region" : "";

    const renameColumn = () => {
        console.log(children)
    }

    return (
        <div 
            className={`col${className}`}
            onClick={renameColumn}
        >
            {children}
        </div>
    );
};

export default Column;