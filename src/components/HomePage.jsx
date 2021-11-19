import React, { useState } from "react";
import Item from "../components/Item";
import DropWrapper from "../components/DropWrapper";
import Column from "../components/Column";
import Window from "./Window";
import TextInput from "./TextInput";
import { data, statuses as initStatuses } from "../data";
import DropDragColumnWrapper from "./Drop&DragColumnWrapper";



const Homepage = () => {
    const [items, setItems] = useState(data);
    const [statuses, setStatuses] = useState(initStatuses);
    const [show, setShow] = useState(false);
    const [column, setColumn] = useState(null);
    const [indexOfColumn, setIndexOfColumn] = useState(null);

    const onOpen = (s) => {setShow(true); setColumn(s); setIndexOfColumn(s.status); console.log(column)};

    const onClose = () => setShow(false);


    const onDrop = (item, monitor, status) => {
        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status});
            return [ ...newItems ];
        });
    };

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];
        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return  [ ...newItems ];
        });
    };
    const moveColumn = (dragIndex, hoverIndex) => {
        const item = statuses[dragIndex];
        setStatuses(prevState => {
            const newStatuses = prevState.filter((i, idx) => idx !== dragIndex);
            newStatuses.splice(hoverIndex, 0, item);
            return  [ ...newStatuses ];
        });
    };

    const renameColumn = (status) => {
        let newItems = [];
        for(let item of items){
            let updatedItem = item;
            if(item.status === indexOfColumn){
                updatedItem.status = status;
            }
            newItems.push(updatedItem);
        }
        setItems(newItems);
        let newColumn = column;
        newColumn.status = status;
        setColumn(newColumn);
    }

    const addColumn = status => {
        let newColor = "#" + ((1<<24)*Math.random() | 0).toString(16);
        const newColumn = {id: statuses.length, status, color: newColor};
        setStatuses(prevState => {
            return [...prevState, newColumn];
        });
    };

    const addItem = (key, content) => {
        const newItem = {id: items.length+1, status: key, content: content};
        setItems(prevState => {
            return  [ ...prevState, newItem ];
        });
    };

    const deleteItem = (i) => {
        setItems(items.filter(item => item.id !== i.id));
        console.log(items)
    }

    return (
        <div className={"row"}>
            {statuses.map((s,statusIndex) => {
                return (
                    <DropDragColumnWrapper column={s} index={statusIndex} moveColumn={moveColumn}>
                        <div key={s.status} className={"col-wrapper"} >
                            <h2 className={"col-header"} onClick={() => onOpen(s)}>{s.status.toUpperCase()}</h2>
                                <DropWrapper onDrop={onDrop} status={s.status}>
                                    <Column addItem={addItem} columnIndex={s.status} addColumn={null}>
                                        {items
                                            .filter(i => i.status === s.status)
                                            .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s} deleteItem={deleteItem}/>)
                                        }

                                    </Column>
                                </DropWrapper>
                        </div>
                    </DropDragColumnWrapper>
                );
            })}
            {statuses.length <= 3 &&
                <div className={"col"}><TextInput addColumn={addColumn} addItem={null}/></div>
            }

            {column &&
                <Window
                    column={column}
                    onClose={onClose}
                    show={show}
                    renameColumn={renameColumn}
                />
            }
        </div>
    );
};

export default Homepage;