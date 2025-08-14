import React, { useState } from 'react';

function ReservationsCreator({callback})
{

    const [newItemText, setNewItemText] = useState("");

    const updateNewTextValue = (event) => {
        setNewItemText(event.target.value);
    };

    const createNewReservations = () => {
        if(newItemText !== "")
        {
            callback(newItemText);
            setNewItemText("");
        }
    }    

    return (
        <div className="my-1">
            <input
                className="form-control"
                placeholder="enter a new reservation item ..."
                value={ newItemText }
                onChange={ updateNewTextValue }
                />
            <button className="btn btn-primary mt-1" onClick={ createNewReservations }>
                Add
            </button>
        </div>
    );
}

export default ReservationsCreator;