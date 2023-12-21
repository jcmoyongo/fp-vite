import React, { useState, useEffect } from 'react';

const TimerComponent = ({isLocal}) => {
//   const [seconds, setSeconds] = useState(0);
  const [easternDateTime, setEasternDateTime] = useState();
  const [userDateTime, setUserDateTime] = useState();
  const [userTImeZone, setUserTimeZone] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
    //   setSeconds(seconds => seconds + 1);

        if (isLocal){
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            setUserTimeZone(timeZone);
            setUserDateTime((new Date()).toLocaleString('fr-FR', { timeZone: timeZone }));
        } else {
            const date = new Date(); 
            const easternDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));
            setEasternDateTime(easternDate);
        }
    }, 1000);

    return () => clearInterval(intervalId); // This clears the interval when the component unmounts
  }, []);

  return (
    <div className="flex flex-col">
      {isLocal? 
        (userTImeZone && <p  className="text-xs text-white">{userTImeZone}: {userDateTime}</p>)
        :(easternDateTime &&  <p  className="text-xs  text-white md:mr-1" >Miami: {easternDateTime.toLocaleString()}</p>)
      } 
    </div>
  );
}

export default TimerComponent;