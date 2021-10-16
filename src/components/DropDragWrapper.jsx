import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

export default function DropDragWrapper({ item, index, children, moveColumn }) {
  const ref = useRef();
  const [{ isDragging }, drag] = useDrag({
    type: "column",
    item: { ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "column",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
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
      item.index = hoverIndex;
    },
  });
  drag(drop(ref));
  return <div ref={ref}>{children}</div>;
}