import React, { createContext, useContext, useEffect, useState } from "react";
import moment from "moment";
import games from '../utils/games'
import teams from '../utils/teams'
import games_sd from '../utils/games_sd'
import getScheduleAsync from "../utils/api_calls/";
import { scheduleAPI, sportsDataIOAPIKey, serieByDateAPI, dbHostURL, currentSeason, seasonType} from "../utils/constants"
import {GetTeamName} from "../utils/helper";

export const GameContext = React.createContext();

export const GameContextProvider = ({children}) => {
    const [formData, setformData] = useState({ dateSelected: "01/01/2000"});
    const [gameList, setGameList] = useState(games.map(g => g));
    const [scheduleList, setScheduleList ]= useState(games_sd.map(s => s));
    const [selectedDate, setSelectedDate] = useState(null);
    const [dayGames, setDayGames] = useState([]);
    const [isAllBets, setIsAllBets] =  useState(false);
    const [allGames, setAllGames] = useState([]);//useState(games_sd.map(d => {return {...d, Winner:""}})); //We're adding the Winnder column to the array object.
    const [teamList, setTeamList] = useState(teams.map(t => t));
    const [bets, setBets] = useState([]);
    const [series, setSeries] = useState([]); 
    const [isRefreshed, setIsRefreshed] = useState(); 
    const [daysBack, setDaysBack] = useState(60);
    const [seasonYear, setSeasonYear] = useState(2024);
    const [loading, setLoading] = useState(false);
    const [dataIOCallStatus, setDataIOCallStatus] = useState({statusCode: 200, message: ""});

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

    const makeSchedule = async () => {
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
        setLoading(true);
        const formatDate = (date) => {
            const year = date.toLocaleString('default', {year: 'numeric'});
            const month = date.toLocaleString('default', {month: '2-digit'});
            const day = date.toLocaleString('default', {day: '2-digit'});
          
            return [year, month, day].join('-');
        }
        try {
                //console.log("Fetching series...");
                const fmtDate = formatDate(new Date(date));
                const endpoint =  `${serieByDateAPI}${fmtDate}?key=${sportsDataIOAPIKey}`; 

                const response = await fetch(endpoint);
                const data = await response.json();

                const daySeries = data.map(serie => {return {...serie, Winner:""}}).sort((a,b) => new Date(a.DateTime) - new Date(b.DateTime)); 

                setSeries(daySeries);
                //console.log([...daySeries, ...daySeries.map(s=>s)]);
        } catch(error){
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    const downloadAllGames = async () => {
    //Must run before fetching other data
        const utcToLocalDate = (date) => {
            var dateLocal = new Date(date);
            var newDate = new Date(dateLocal.getTime() - dateLocal.getTimezoneOffset()*60*1000);
            return newDate;
        }
        
        const diffInHours = (dt2, dt1) =>
        {//
            var diff =(dt2.getTime() - dt1.getTime()) / 1000;
            diff /= (60 * 60);
            const hours = Math.floor(diff);
            return hours;     
        }

        const getScheduleFromDB = async () => {
            const response = await fetch(`${dbHostURL}/schedule/${seasonYear}`, { mode: 'cors' });
            const jsonResponse = await response.json();
            const data = JSON.parse(jsonResponse[0].games);
            let lastUpdated = utcToLocalDate(jsonResponse[0].latest_update);

            //console.log(lastUpdated);
            return { data, lastUpdated };
        }

        const isStaleSchedule = async (data, lastUpdated) => {
            try {             
                const updated = new Date(data.map( g => {return moment(g.Updated)}).reverse()[0]);
                const day = new Date(data.map( g => {return moment(g.Day)}).reverse()[0]);
                const easternDateTime = new Date((new Date()).toLocaleString('en-US', { timeZone: 'America/New_York',}))

                const diff = diffInHours(easternDateTime, lastUpdated);
               
                const stale = diffInHours(easternDateTime, lastUpdated) >= 1;

                return stale;
            } catch (error) {
                console.log(error);
                return false;
            }             

        }

        const fetchScheduleFromAPI = async () => {
            const endpoint = `${scheduleAPI}${seasonYear}${seasonType}?key=${sportsDataIOAPIKey}`; 
            try {
                const response = await fetch(endpoint, {mode: 'cors'});
                const data = await response.json();
                setDataIOCallStatus({statusCode: data.statusCode, message: data.message});
                // console.log(dataIOCallStatus);
                return data.map(d => {return {...d, Winner:""}});
            } catch(error){
                // console.log("error");
            }
        }

        const mergeSchedule = async (season, sched, lastUpdateTime) => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            //const sched = await fetchAPISchedule();
            const body = { "season":season, "games": sched, "latest_update": lastUpdateTime};
    
            var raw = JSON.stringify(body); 
        
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
                mode: 'cors'
              };

            const response = await fetch(`${dbHostURL}/schedule/merge`, requestOptions);
            const data = await response.text();    
        }

        try {
            //var { data, lastUpdated } = await getScheduleFromDB();
            const isStale = true;// await isStaleSchedule(data, lastUpdated);

            if (isStale) {
                //Fetch from API, upsert DB, setAllGames
                const gamesWithWinner = await fetchScheduleFromAPI();
                setAllGames(gamesWithWinner);
                //await mergeSchedule(seasonYear, gamesWithWinner, lastUpdateTime);

                setIsRefreshed(true);
            } else {
                setAllGames(data);
            }      

        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        downloadAllGames(); //Must run before
        makeSchedule();
    }, [JSON.stringify(allGames)]//?!?
    );

    return (
        <GameContext.Provider
          value={{scheduleList, 
            gameList, setGameList, 
            selectedDate, setSelectedDate, handleChange, formData, 
            dayGames, setDayGames, isAllBets, setIsAllBets, 
            allGames, teamList, bets, setBets, downloadSeries, series, loading, dataIOCallStatus}}
        >
            {children}
        </GameContext.Provider>
    )
};