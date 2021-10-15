import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Picture from './Picture';
import "../App.css";

const PictureList = [
    {
        id: 1,
        url:
            "https://yt3.ggpht.com/ytc/AAUvwnjOQiXUsXYMs8lwrd4litEEqXry1-atqJavJJ09=s900-c-k-c0x00ffffff-no-rj",
    },
    {
        id: 2,
        url:
            'https://upload.wikimedia.org/wikipedia/commons/c/c7/Tabby_cat_with_blue_eyes-3336579.jpg',
    },
    {
        id: 3,
        url:
            "https://yt3.ggpht.com/pe57RF1GZibOWeZ9GwRWbjnLDCK2EEAeQ3u4iMAFNeaz-PN9uSsg1p2p32TZUedNnrUhKfoOuMM=s900-c-k-c0x00ffffff-no-rj",
    },
];

function DragDrop () {
    const [board, setBoard] = useState([]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addImageToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addImageToBoard = (id) => {
        const pictureList = PictureList.filter((picture) => id === picture.id);
        setBoard((board) => [...board, pictureList[0]]);
    };

    return (
        <>
            <div className="Pictures">
                {PictureList.map((picture) =>{
                    return <Picture url={picture.url} id={picture.id}/>
                })}

            </div>
            <div className="Board" ref={drop} style={{width: '300px',height: '500px',border: '2px solid black'}}>
                 {board.map((picture) => {
                      return <Picture url={picture.url} id={picture.id}/>;
                 }
                    )}
            </div>
        </>
    )
}

export default DragDrop;