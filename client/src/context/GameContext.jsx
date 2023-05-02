import React, { createContext, useContext, useEffect, useState } from "react";
import moment from "moment";
import games from '../utils/games'
//import schedule from '../utils/schedule'; 
import teams from '../utils/teams'; 
import games_sd from '../utils/games_sd'
import getScheduleAsync from "../utils/api_calls/";
import { scheduleAPI, sportsDataIOAPIKey, serieByDateAPI} from "../utils/constants"
import {GetTeamName} from "../utils/helper";


export const GameContext = React.createContext();

export const GameContextProvider = ({children}) => {
    const [formData, setformData] = useState({ dateSelected: "01/01/2000"});
    const [gameList, setGameList] = useState(games.map(g => g));
    const [scheduleList, setScheduleList ]= useState(games_sd.map(s => s));
    const [selectedDate, setSelectedDate] = useState(null);
    const [dayGames, setDayGames] = useState([]);
    const [isAllBets, setIsAllBets] =  useState(false);
    const [allGames, setAllGames] = useState(games_sd.map(d => {return {...d, Winner:""}})); //We're adding the Winnder column to the array object.
    const [teamList, setTeamList] = useState(teams.map(t => t));
    const [bets, setBets] = useState([]);
    const [series, setSeries] = useState([]); 
    const [isRefreshed, setIsRefreshed] = useState(); 
    const [daysBack, setDaysBack] = useState(5)

    const handleChange = (e) => {
        if (e === null) {
            setSeries([]);
            setSelectedDate(null);
        }
        else {
            setSelectedDate(e.value);
            downloadSeries(e.value);
        }

        //const games = allGames.filter(g => moment(g.Day).format('L') === e.value);
        setDayGames(series); //Updating late...
        setIsAllBets(false);
        setBets([]);
    };

    const getSchedule = async () => {
    //Must run after all games are downloaded
        try {
            let uniqueDates = [
                ...new Map(allGames.map((item) => [item["Day"], item])).values(),
            ].map((game, key) =>{ 
                return {id: key, value: moment(game.Day).format('L'), label:  moment(game.Day).format('L')}
            }).filter(date => date.value >=  moment((new Date()).setDate((new Date()).getDate() - daysBack)).format('L') );
            // moment((new Date()).setDate((new Date()).getDate() -X)).format('L') ); to back X days
            setScheduleList(uniqueDates);

        } catch(error){
            console.log(error);
        }
    }

    const downloadSeries = async (date) => {
        const formatDate = (date) => {
            const year = date.toLocaleString('default', {year: 'numeric'});
            const month = date.toLocaleString('default', {month: '2-digit'});
            const day = date.toLocaleString('default', {day: '2-digit'});
          
            return [year, month, day].join('-');
          }
        try {
                //console.log("Fetching series...");
                const fmtDate = formatDate(new Date(date));
                const season = "POST";
                const endpoint =  `${serieByDateAPI}${fmtDate}?key=${sportsDataIOAPIKey}`; 

                const response = await fetch(endpoint);
                const data = await response.json();

                const daySeries = data.map(serie => {return {...serie, Winner:""}}).sort((a,b) => new Date(a.DateTime) - new Date(b.DateTime)); 
  
                setSeries(daySeries);
                //console.log([...daySeries, ...daySeries.map(s=>s)]);
        } catch(error){
            console.log(error);
        }
    }

    const downloadAllGames = async () => {
    //Must run before fetching other data
        try {
            let isNoGames = false;
            try {
                isNoGames = (allGames.length == 0 || allGames === undefined || allGames === null);
            } catch {}

            let isStaleSchedule = false;

            if (!isNoGames && !isRefreshed) {
                const maxDate = allGames.map( g => {return moment(g.Updated).format('LLLL')}).reverse()[0];
                isStaleSchedule = (new Date() - new Date(maxDate)) / (1000 * 60 * 60 * 24) > 1; //Last time schedule was updated is more than a day?
            }
            setIsRefreshed(true);

            

            if ((isNoGames || isStaleSchedule) && !isRefreshed) { 
                const year = new Date().getFullYear();
                //console.log("Fetching from API...");
                const season = "POST";
                const endpoint = `${scheduleAPI}${year}${season}?key=${sportsDataIOAPIKey}`; 
                const response = await fetch(endpoint);
                const data = await response.json();

                const gamesWithWinner = data.map(d => {return {...d, Winner:""}});
                setAllGames(gamesWithWinner);
                setIsRefreshed(true);
            }
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        downloadAllGames(); //Must run before
        getSchedule();//Depends on th
    }, [bets, series, selectedDate]
    );

    return (
        <GameContext.Provider
          value={{scheduleList, 
            gameList, setGameList, 
            selectedDate, setSelectedDate, handleChange, formData, 
            dayGames, setDayGames, isAllBets, setIsAllBets, 
            allGames, teamList, bets, setBets, downloadSeries, series}}
        >
            {children}
        </GameContext.Provider>
    )
};