import React, { useState, useEffect } from "react";
import Modal from "react-modal";

//Modal.setAppElement("#app");

const Window = ({ show, onClose, column, renameColumn }) => {
    const [columnName, setColumnName] = useState(column);

    const onSubmit = (event) => {
        const form = event.target;
        event.preventDefault();
        const value = form.input.value.trim();
        //console.log(value);

        //setProperties(prevState => ({...prevState, values: {...prevState.values, b: e.target.value}}))
        //<Form.Control onChange={e => setProperties({ ...properties, values: { ...properties.values, a: e.target.value }})}>

        let newColumn = column;
        newColumn.status = value;
        //console.log(newColumn)
    //     setColumnName(newColumn);
    //     console.log(columnName)
    //    // console.log(column)
    //     if (!value) return;

        renameColumn(value);
    //form.reset();
    }
    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            className={"modal"}
            overlayClassName={"overlay"}
        >

            <div className={"close-btn-ctn"}>
                <h1 style={{ flex: "1 90%" }}>{column.status}</h1>
                <button className="close-btn" onClick={onClose}>X</button>
                {/* {console.log(column)} */}
                
            </div>
            <div>
                <h2>Rename Column</h2>
                <form
                   // ref={node => (form = node)}
                    onSubmit={onSubmit}>
                        <input
                            type="text"
                            className="item"
                            name="input"
                            placeholder={"Add new task"}
                            //placeholder={placeholder}
                            autoComplete="off"
                            defaultValue={columnName.status}
                        />
                </form>
                            
            </div>
        </Modal>
    );
};

export default Window;