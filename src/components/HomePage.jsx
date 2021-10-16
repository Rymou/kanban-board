import React, { useState } from "react";
import Item from "../components/Item";
import DropWrapper from "../components/DropWrapper";
import Column from "../components/Column";
import { data, statuses as initStatuses } from "../data";
import { useDrag } from "react-dnd";
import DropColumnWrapper from "./DropColumnWrapper";



const Homepage = () => {
    const [items, setItems] = useState(data);
    const [statuses, setStatuses] = useState(initStatuses)
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
        const item = items[dragIndex];
        setStatuses(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return  [ ...newItems ];
        });
    };

    return (
        <div className={"row"}>
            {statuses.map((s,statusIndex) => {
                return (
                    <DropColumnWrapper item={s} index={statusIndex} moveColumn={moveColumn}>
                        <div key={s.status} className={"col-wrapper"}>
                            <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
                                <DropColumnWrapper onDrop={onDrop} status={s.status}>
                                    <Column>
                                        {items
                                            .filter(i => i.status === s.status)
                                            .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s} />)
                                        }
                                    </Column>
                                </DropColumnWrapper>
                        </div>
                    </DropColumnWrapper>
                );
            })}
        </div>
    );
};

export default Homepage;