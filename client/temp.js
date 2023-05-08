import games_sd from './src/utils/games_sd.js'
import moment from "moment";
import { dbHostURL} from "./src/utils/constants.js"
import { db, getScheduleBySeason } from './node-pg-db/db.js';

const  lastUpdate =  async  () => {
    const sched = games_sd.map(s => s);
     


        const year = new Date().getFullYear();
        //console.log("Fetching from API...");

        const response = await fetch("http://localhost:3002/schedule");
        const data = await response.json();

        console.log(sched.map( g => {return moment(g.Updated).format('LLLL')}).reverse()[0]);
        console.log(data.map( g => {return moment(g.Updated).format('LLLL')}).reverse()[0]);
        console.log(sched.map( g => {return moment(g.Day).format('LLLL')}).reverse()[0]);
        console.log(data.map( g => {return moment(g.Day).format('LLLL')}).reverse()[0]);

        const s_updated = new Date(sched.map( g => {return moment(g.Updated).format('LLLL')}).reverse()[0]).getTime();
        const d_updated = new Date(data.map( g => {return moment(g.Updated).format('LLLL')}).reverse()[0]).getTime();
        console.log(s_updated > d_updated) ;

        const s_day = new Date(sched.map( g => {return moment(g.Day).format('LLLL')}).reverse()[0]).getTime();
        const d_day = new Date(data.map( g => {return moment(g.Day).format('LLLL')}).reverse()[0]).getTime();

        console.log(s_day > d_day) ;

        console.log(d_updated > d_updated || s_day > d_day) ;

        //(new Date() - new Date(maxDate)) / (1000 * 60 * 60 * 24) > 1; //Last time schedule was updated is more than a day?
  }

const fetchSchedule = async () => {
    const year = new Date().getFullYear();
    const season = "POST";
    const endpoint = "https://api.sportsdata.io/v3/nba/scores/json/SchedulesBasic/2023post?key=357fa5f8551c41cea6afc56a1345c611"; 
    const response = await fetch(endpoint);
    const data = await response.json();
    //const gamesWithWinner = data.map(d => {return {...d, Winner:""}});
    return data.map(d => {return {...d, Winner:""}});

}
  const mergeSchedule = async (season) => {
    console.log("Entered merge...");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const sched = await fetchSchedule()
    const modsched = { "season":season, "games": sched};

    var raw = JSON.stringify(modsched ); 
    console.log(raw);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      console.log(`${dbHostURL}/schedule/merge`);
      const response = await fetch(`${dbHostURL}/schedule/merge`, requestOptions);
      const data = await response.text();
      console.log(data);
}
  //lastUpdate();
//const sched =  await fetchSchedule()
//const newSched = { "season":2025, "games": sched }
//console.log( newSched.season, newSched.games[0]);
//mergeSchedule(2062)

getScheduleBySeason(2023)