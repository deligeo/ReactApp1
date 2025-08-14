import React, { useState } from 'react';

function ReservationsRow({ item, toggle, deleteReservations, editReservations }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.area);

  const onToggle = () => toggle(item);
  const onDelete = () => deleteReservations && deleteReservations(item);
  const onSave = () => {
    editReservations(item, editedText);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          item.area
        )}
      </td>
      <td>
        <input type="checkbox" checked={item.done} onChange={onToggle} />
      </td>
      <td>
        {/* Edit button only for incomplete Reservations */}
        {editReservations && !isEditing && (
          <button
            className="btn btn-sm btn-warning me-1"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
        {isEditing && (
          <button
            className="btn btn-sm btn-success me-1"
            onClick={onSave}
          >
            Save
          </button>
        )}

        {/* Delete button only for completed Reservations */}
        {deleteReservations && (
          <button
            className="btn btn-sm btn-danger"
            onClick={onDelete}
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}

export default ReservationsRow;