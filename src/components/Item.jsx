import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";


const Item = ({ item, index, moveItem, deleteItem, status }) => {
    const ref = useRef();

    const [, drop] = useDrop({
        accept: "item",
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            //get Y position
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            //get the last recorded { x, y } of the dragged item
            const mousePosition = monitor.getClientOffset();
            //get X position
            const hoverClientY = mousePosition.y - hoveredRect.top;

            //no need to move it
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: "item",
        item: { ...item, index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });
    //Identify and locate the HTML item we are working with
    drag(drop(ref));

    const _deleteItem = () => {
        deleteItem(item);
    }

    return (
        <div>
            <div
                ref={ref}
                style={{ opacity: isDragging ? 0 : 1 }}
                className={"item"}
            >
                <button style={{float: 'right'}} onClick={_deleteItem}>X</button>
                <div className={"color-bar"} style={{ backgroundColor: status.color }}/>
                <p className={"item-title"}>{item.content}</p>
                <p className={"item-status"}>{item.icon}</p>

            </div>
        </div>
    );
};

export default Item;