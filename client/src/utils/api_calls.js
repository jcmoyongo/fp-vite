
import React, { useEffect, useState } from "react"
import { scheduleAPI, sportsDataIOAPIKey} from "./constants"

const GetScheduleAsync = (year, season ) => {
  const [schedule, setSchedule] = useState([])

  const fetchData = async () => {
    //const endpoint = `${scheduleAPI}${year}}${season}?key=${sportsDataIOAPIKey}`; 
    //console.log(endpoint);
    //const response = await fetch(endpoint);
    //const data = await response.json();
    //setSchedule(data)
    //console.log(schedule);
  }

}

export default GetScheduleAsync;