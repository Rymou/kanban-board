import React, { useState } from "react";
import Item from "../components/Item";
import DropWrapper from "../components/DropWrapper";
import Column from "../components/Column";
import Window from "./Window";
import { data, statuses as initStatuses } from "../data";
import DropDragWrapper from "./DropDragWrapper";



const Homepage = () => {
    const [items, setItems] = useState(data);
    const [statuses, setStatuses] = useState(initStatuses);
    const [show, setShow] = useState(false);
    const [column, setColumn] = useState(null);
    const [indexOfColumn, setIndexOfColumn] = useState(null);


    const onOpen = (s) => {setShow(true); setColumn(s); setIndexOfColumn(s.status); console.log(column)};

    const onClose = () => setShow(false);


    const onDrop = (item, monitor, status) => {
        const mapping = statuses.find(si => si.status === status);

        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status, icon: mapping.icon });
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
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return  [ ...newItems ];
        });
    };

   

    

    const renameColumn = (s) => {
        //console.log(s);
        //console.log(column)
        let newItems = [];
        for(let item of items){
            let updatedItem = item;
            console.log(indexOfColumn)
            if(item.status === indexOfColumn){
                updatedItem.status = s;
                console.log(updatedItem)
            }
            newItems.push(updatedItem);         
        }
        setItems(newItems);
        //console.log(newItems)

        let newColumn = column;
        newColumn.status = s;
        //console.log(newColumn);

        //console.log(s);
        //let newStatus = statuses.filter((status, i) => status === column.status);
        //let statusIndex = statuses.filter((status, i) => i === column.id);
        setColumn(newColumn);
        //console.log(scores.indexOf(10));
        // let statusIndex = statuses.indexOf(column);
        // let newStatuses = statuses;
        //console.log(statuses);
    }

    return (
        <div className={"row"}>
            {statuses.map((s,statusIndex) => {
                return (
                    <DropDragWrapper item={s} index={statusIndex} moveColumn={moveColumn}>
                        {/* {console.log(statuses)}
                        {console.log(items)} */}
                        <div key={s.status} className={"col-wrapper"} onClick={() => onOpen(s)}>
                            <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
                                <DropWrapper onDrop={onDrop} status={s.status}>
                                    <Column>
                                        {items
                                            .filter(i => i.status === s.status)
                                            .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s} />)
                                        }
                                    </Column>
                                </DropWrapper>
                        </div>
                    </DropDragWrapper>
                );
            })}
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