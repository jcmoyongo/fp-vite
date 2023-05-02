import games_sd from './src/utils/games_sd.js'
import moment from "moment";

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

        
        fetch('http://localhost:3002/schedule')
        .then(response => {
             return response.text();
        })
       .then(data => {
            //console.log(JSON.parse(data));
        });
       
 
  }


  lastUpdate();