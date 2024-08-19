import React, { useState, useEffect } from 'react';

const HolidayComponent = () => {
  const [message, setMessage] = useState();

  useEffect(() => {
    var today = new Date();
    var month = today.getMonth();
    var day = today.getDate();
    console.log(month, day, today);

    if (month == 11 && day > 24) {
      setMessage('Joyeux Noël!');
    } else if (month == 0 && day < 2) {
      setMessage('Bonne Année!');
    } else if (month == 0) {
      setMessage('Bonne fêtes!');
    }

  }, []);

  return (
    <div className="flex justify-center items-center holidayAnimation mt-1">
        <img src= "././images/fetes.jpg" alt="Bonnes fêtes" className="h-32 w-full"   />
    </div>
  );
}

export default HolidayComponent;