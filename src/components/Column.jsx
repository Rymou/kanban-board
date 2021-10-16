import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import TextInput from "./TextInput";

const Column = ({ column, index, isOver, moveColumn, children }) => {
    const className = isOver ? "highlight-region" : "";
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'column',
        hover(column, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = column.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveColumn(dragIndex, hoverIndex);
            column.index = hoverIndex;
        },
    });


    const [{ isDragging }, drag] = useDrag({
        type: 'column',
        column: { ...column, index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });
    drag(drop(ref));

    /*
            <div
                ref={ref}
                style={{ opacity: isDragging ? 0 : 1 }}
                className={"item"}
                onClick={onOpen}
            >

    */

    return (
        <div 
            className={`col${className}`}
            ref={ref}
            style={{ opacity: isDragging ? 0 : 1 }}
        >
            <div>{console.log(column)}</div>
            {children}
            {/* <TextInput 
                onSubmit={addTask}  
            /> */}
        </div>
    );
};

export default Column;