import React from "react";
import { useDrop } from "react-dnd";

const DropColumnWrapper = ({ onDrop, children }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'column',
        drop: (column, monitor) => {
            onDrop(column, monitor);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={drop} className={"drop-wrapper"}>
            {/* {React.cloneElement(children, { isOver })} */}
        </div>
    )
};

export default DropColumnWrapper;