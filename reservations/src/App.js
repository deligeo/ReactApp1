import React, { useState, useEffect } from 'react';
import './App.css';
import ReservationsBanner from './ReservationsBanner';
import ReservationsRow from './ReservationsRow';
import ReservationsCreator from './ReservationsCreator';
import VisibilityControl from './VisibilityControl';

function App() {
  const [userName] = useState("DG");

  const [reservationsItems, setReservationsItems] = useState([
    { area: "Rouge National Urban Park 9:00 AM to 12:00 PM", done: false },
    { area: "Rouge National Urban Park 12:00 PM to 3:00 PM", done: false },
    { area: "Rouge National Urban Park 3:00 PM to 6:00 PM", done: false },
    { area: "Albion Hills Conservation Park 9:00 AM to 12:00 PM", done: false },
    { area: "Albion Hills Conservation Park 12:00 PM to 3:00 PM", done: false },
    { area: "Albion Hills Conservation Park 3:00 PM to 6:00 PM", done: false },
    { area: "Kopegaron Woods Conservation Area 9:00 AM to 12:00 PM", done: true },
    { area: "Kopegaron Woods Conservation Area 12:00 PM to 3:00 PM", done: true },
    { area: "Kopegaron Woods Conservation Area 3:00 PM to 6:00 PM", done: true },
    { area: "Mono Cliffs Provincial Park 9:00 AM to 12:00 PM", done: false },
    { area: "Mono Cliffs Provincial Park 12:00 PM to 3:00 PM", done: false },
    { area: "Mono Cliffs Provincial Park 3:00 PM to 6:00 PM", done: false }
  ]);

  const [showCompleted, setShowCompleted] = useState(true);

  const createNewReservations = (task) => {
    if (!reservationsItems.find(item => item.area === task)) {
      const updatedReservations = [...reservationsItems, {area: task, done: false}];
      setReservationsItems([...reservationsItems, { area: task, done: false }]);
      localStorage.setItem("reservations", JSON.stringify(updatedReservations));
    }
  };

  const toggleReservations = (reservations) => {
    const updatedReservations = reservationsItems.map((item) =>    
      item.area === reservations.area
        ? { ...item, done: !item.done }
        : item
    );
    setReservationsItems(updatedReservations);
     localStorage.setItem("reservations", JSON.stringify(updatedReservations));
  };

  const deleteReservations = (reservations) => {
    if (reservations.done) {
      const updatedReservations = reservationsItems.filter(item => item.area !== reservations.area);
      setReservationsItems(updatedReservations);
      localStorage.setItem("Reservations", JSON.stringify(updatedReservations));
    }
  };

  const editReservations = (oldItem, newAction) => {
    setReservationsItems(
      reservationsItems.map(item =>
        item.area === oldItem.area ? { ...item, area: newAction } : item
      )
    );
  };

  const reserveCompleted = () => {
    setReservationsItems(reservationsItems.filter(item => !item.done));
  };

  useEffect(() => {
    try {
      const data = localStorage.getItem("reservations");
      if(data)
      {
        const parsedData = JSON.parse(data);
        if(Array.isArray(parsedData)) {
          setReservationsItems(parsedData);
        }
      }
      else
      {
        [userName] = "DG";
        [reservationsItems] = [
          { area: "Rouge National Urban Park 9:00 AM to 12:00 PM", done: false },
          { area: "Rouge National Urban Park 12:00 PM to 3:00 PM", done: false },
          { area: "Rouge National Urban Park 3:00 PM to 6:00 PM", done: false },
          { area: "Albion Hills Conservation Park 9:00 AM to 12:00 PM", done: false },
          { area: "Albion Hills Conservation Park 12:00 PM to 3:00 PM", done: false },
          { area: "Albion Hills Conservation Park 3:00 PM to 6:00 PM", done: false },
          { area: "Kopegaron Woods Conservation Area 9:00 AM to 12:00 PM", done: true },
          { area: "Kopegaron Woods Conservation Area 12:00 PM to 3:00 PM", done: true },
          { area: "Kopegaron Woods Conservation Area 3:00 PM to 6:00 PM", done: true },
          { area: "Mono Cliffs Provincial Park 9:00 AM to 12:00 PM", done: false },
          { area: "Mono Cliffs Provincial Park 12:00 PM to 3:00 PM", done: false },
          { area: "Mono Cliffs Provincial Park 3:00 PM to 6:00 PM", done: false }
        ];
        [showCompleted] = true;
      }
    }
    catch(error) {
      console.error("Failed to load reservations:", error);
    }
  },[])

  return (
    <div className="container mt-3">
      <ReservationsBanner userName={userName} reservationsItems={reservationsItems} />

      <div className="m-3">
        <ReservationsCreator callback={createNewReservations} />
      </div>
      
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Conservation Area & Time</th>
            <th>Reserved</th>
            <th>Actions</th> {/* For edit button */}
          </tr>
        </thead>
        <tbody>
          {reservationsItems.filter(item => !item.done).map(item => (
            <ReservationsRow
              key={item.area}
              item={item}
              toggle={toggleReservations}
              editReservations={editReservations} // only passed for incomplete
            />
          ))}
        </tbody>
      </table>

      <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl
            description="Reserved Area and Time"
            isChecked={showCompleted}
            callback={(checked) => setShowCompleted(checked)} />
        </div>

        {showCompleted && (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th style={{ width: "60%" }}>Conservation Area & Time</th>
              <th style={{ width: "20%" }}>Reserved</th>
              <th style={{ width: "20%" }}>Actions</th> {/* Delete button */}
            </tr>
          </thead>
          <tbody>
            {reservationsItems.filter(item => item.done).map(item => (
              <ReservationsRow
                key={item.area}
                item={item}
                toggle={toggleReservations}
                deleteReservations={deleteReservations} // only passed here
              />
            ))}
          </tbody>
        </table>
      )}

      {reservationsItems.some(item => item.done) && (
        <div className="text-center mt-3">
          <button
            className="btn btn-danger"
            onClick={reserveCompleted}
          >
            Clear All Reserved
          </button>
        </div>
      )}

    </div>
  );
}

export default App;