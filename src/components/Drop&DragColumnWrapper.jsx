import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

export default function DropDragColumnWrapper({ column, index, children, moveColumn }) {
  const ref = useRef();
  const [, drag] = useDrag({
    //The types let you specify which drag sources and drop targets are compatible
    type: "column",
    item: { index },
    //the monitor updates the props of column components in response to the drag and drop state changes.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });


  const [, drop] = useDrop({
    accept: "column",
    hover(column, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = column.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      // const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const hoverMiddleX = (hoveredRect.left - hoveredRect.right) / 2;
      const mousePosition = monitor.getClientOffset();
      // const hoverClientY = mousePosition.y - hoveredRect.bottom;
      const hoverClientX = mousePosition.x - hoveredRect.right;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      moveColumn(dragIndex, hoverIndex);
      column.index = hoverIndex;
    },
  });
  drag(drop(ref));
  return <div ref={ref}>{children}</div>;
}