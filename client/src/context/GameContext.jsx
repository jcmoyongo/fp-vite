import React, { createContext, useContext, useEffect, useState } from "react";
import moment from "moment";
import games from '../utils/games'
import teams from '../utils/teams'
import games_sd from '../utils/games_sd'
import getScheduleAsync from "../utils/api_calls/";
import { scheduleAPI, postSeasonAPI, sportsDataIOAPIKey, serieByDateAPI, dbHostURL, 
    currentSeason, seasonType, ENVIRONMENT} from "../utils/constants"
import { patchScheduleAPI} from "../utils/helper";

export const GameContext = React.createContext();

export const GameContextProvider = ({children}) => {
    const [formData, setformData] = useState({ dateSelected: "01/01/2000"});
    const [gameList, setGameList] = useState([]);//useState(games.map(g => g));
    const [scheduleList, setScheduleList ]= useState([]);//useState(games_sd.map(s => s));
    const [selectedDate, setSelectedDate] = useState(null);
    const [dayGames, setDayGames] = useState([]);
    const [isAllBets, setIsAllBets] =  useState(false);
    const [allGames, setAllGames] = useState([]);
    const [teamList, setTeamList] = useState(teams.map(t => t));
    const [bets, setBets] = useState([]);
    const [series, setSeries] = useState([]); 
    const [isRefreshed, setIsRefreshed] = useState(); 
    const [daysBack, setDaysBack] = useState(3);
    const [seasonYear, setSeasonYear] = useState(2024);
    const [loading, setLoading] = useState(false);
    const [dataIOCallStatus, setDataIOCallStatus] = useState({statusCode: 200, message: ""});
    const [userProfile, setUserProfile] = useState(null);
    const [allGamesPatch, setAllGamesPatch] = useState(games_sd.map(s => s));

    const selectHandleChange = (e) => {
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
            // let uniqueDates = [
            //     ...new Map(allGames.map((item) => [item["Day"], item])).values()
            // ].map((game, key) =>{ 
            //     return {id: key, value: moment(game.Day).format('L'), label:  moment(game.Day).format('L')}
            // })
            // // .filter(date => date.value >=  moment((new Date()).setDate((new Date()).getDate() - daysBack)).format('L') );
            // console.log(uniqueDates);
            // setScheduleList(uniqueDates);

            let filteredDates = allGames
            .filter(game => moment().diff(moment(game.Day), 'days') <= 1)
            .map(game => moment(game.Day).format('L'));
          
            let uniqueGameDates = [...new Set(filteredDates)].map((date, key) => {
                return {id: key, value: date, label: date};
            });

            setScheduleList(uniqueGameDates);
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
                const now = (new Date()).getTime();
                let daySeries = [];

                // console.log(ENVIRONMENT);
                if (ENVIRONMENT === 'development') {
                    daySeries = allGames.map(serie => {return {...serie, Winner:""}})
                                .filter(g => moment(g.Day).format('L') === date)
                } else {
                    const response = await fetch(`${serieByDateAPI}${formatDate(new Date(date))}?key=${sportsDataIOAPIKey}`, {mode: 'cors'});
                    const data = await response.json();
                    daySeries = data.map(serie => {return {...serie, Winner:""}}).filter(s => s.Status !== "Canceled");
                }

                daySeries.sort((a,b) => new Date(a.DateTime) - new Date(b.DateTime));
                setSeries(daySeries);

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
        {
            var diff =(dt2.getTime() - dt1.getTime()) / 1000 / 60 / 60;
            return Math.floor(diff);;     
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

                return diffInHours(easternDateTime, lastUpdated) >= 1;
            } catch (error) {
                console.log(error);
                return false;
            }             

        }

        const fetchScheduleFromAPI = async () => {
            try {
                const endpoint = `${postSeasonAPI}${seasonYear}${seasonType}?key=${sportsDataIOAPIKey}`; 
                const response = await fetch(endpoint, {mode: 'cors'});
                const data = await response.json();

                setDataIOCallStatus({statusCode: data.statusCode, message: data.message});

                if (data.statusCode === 403) {
                    return [];
                } else { 
                    return data.map(d => {return {...d, Winner:""}});
                }

            } catch(error){
                console.log(error);
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

            let env = ENVIRONMENT;
            let gamesWithWinner = await fetchScheduleFromAPI();

            if (isStale) {
                if (env === 'development') {     
                    let now = new Date();   
                    gamesWithWinner =  allGamesPatch.map(d => {
                        if (now > (new Date(d.DateTime)).getTime()) {
                            return {
                                ...d, 
                                Status: d.AwayTeamScore ? d.Status: "Static", 
                                Winner: ""
                              }
                        } else {
                            return {...d, Winner: ""};
                        }
                    });
                    setAllGames(gamesWithWinner);
                } else if (env === 'production') {
                    // gamesWithWinner =  await fetchScheduleFromAPI();
                    setAllGames(gamesWithWinner);
                    //await mergeSchedule(seasonYear, gamesWithWinner, lastUpdateTime); For when the DB is online.
                    //setIsRefreshed(true);
                }

            } else {
                // setAllGames(data);
            }      

        } catch(error){
            console.log(error);
        }
        finally {
            // console.log(process.env.NODE_ENV);
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
            selectedDate, setSelectedDate, handleChange: selectHandleChange, formData, 
            dayGames, setDayGames, isAllBets, setIsAllBets, 
            allGames, teamList, bets, setBets, downloadSeries, series, loading, dataIOCallStatus,
            userProfile, setUserProfile}}
        >
            {children}
        </GameContext.Provider>
    )
};