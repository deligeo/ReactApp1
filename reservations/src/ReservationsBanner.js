import React from 'react';

function ReservationsBanner({userName, reservationsItems})
{
    return (
        <h4 className="bg-primary text-white text-center p-2">
            { userName }'s Conservation Area
            ({ reservationsItems.filter(r => !r.done).length } reservations available)
        </h4>
    );
}

export default ReservationsBanner;