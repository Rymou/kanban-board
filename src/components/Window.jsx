import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const Window = ({ show, onClose, column, renameColumn }) => {

    const onSubmit = (event) => {
        const form = event.target;
        event.preventDefault();
        const value = form.input.value.trim();
        let newColumn = column;
        newColumn.status = value;
        renameColumn(value);
    }
    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            className={"modal"}
            overlayClassName={"overlay"}
        >

            <div className={"close-btn-ctn"}>
                <h2 style={{ flex: "1 25%" }}>Rename Column</h2>
                <button className="close-btn" onClick={onClose}>X</button>
                
            </div>
            <div>
                <h1 style={{ flex: "1 25%" }}>{column.status}</h1>
                <form
                    onSubmit={onSubmit}>
                        <input
                            type="text"
                            className="item"
                            name="input"
                            placeholder={"Rename column"}
                            autoComplete="off"
                            defaultValue={column.status}
                        />
                </form>
                            
            </div>
        </Modal>
    );
};

export default Window;