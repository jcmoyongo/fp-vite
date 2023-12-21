import React, {useContext, useState, useEffect} from "react";
import { GameContext } from "../context/GameContext";
import {RadioButtonComponent} from "../components/RadioButton"
import {GetStadiumName, GetTeamAcronym, GetTeamName,  
    getSeriesStatus, getWinnerFontColor, translateStatus, timeAgo, getObjectColorByDateTime, getStatusColors} from "../utils/helper";
import moment from "moment";
import 'moment/locale/fr';

const LoadingAnimation = () => {

    setTimeout(() => {

    }, 5000);

    return (
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                </div>
                </div>
            </div>
        </div>
    )
}

const Game = ({game}) =>{
    const [winner, setWinner] = useState();
    const {setGameList, dayGames, setIsAllBets, setBets, series, loading} = useContext(GameContext);
    const [statusColor, setStatusColor] = useState({ background: '', border: '', text: '' });
    const [borderStatusColor, setBorderStatusColor] = useState({ background: '', border: '', text: '' });
    const [seriesStatus, setSeriesStatus] = useState("");
    const [gameTimeColor, setGameTimeColor] = useState("");

    const homeTeam = GetTeamName(game.HomeTeam);
    const awayTeam = GetTeamName(game.AwayTeam);

    const radioChangeHandler = (e) => {
        //Update the winner in the day's list.
        setWinner(e.target.value);
        game.Winner = GetTeamAcronym( e.target.value);
        //Update the game list with the latest winner. 
        //game is the game that was clicked on, an element of gameList, he list of games for the day.
        setGameList(dayGames);
        //This is how we know a winner has been selected for all of the day's games.
        const isAllBets = series.every(g => g.Winner !== "");
        setIsAllBets(isAllBets);

        const dayBets = series.filter(g => g.Status == "Scheduled").map(g => g.Winner);
        setBets(dayBets);
    };

    useEffect(() => { 
        setStatusColor(getStatusColors(game.Status));
        setBorderStatusColor(getStatusColors(game.Status));
        //getSeriesStatus();
    }, [game]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setGameTimeColor(getObjectColorByDateTime(game));
            // console.log(getObjectColorByDateTime(game));
        }, 1000);
    
        return () => clearInterval(intervalId); // This clears the interval when the component unmounts
      }, []);

    return (
        (loading)
        ?
        <LoadingAnimation />
        :
        <div className={`flex flex-row w-full border p-1 mb-1 hover:shadow-xl`}>
            <div className={`flex flex-row items-center w-full`}>
                <div className="flex flex-col w-full">
                    {/* <p className="text-xs text-gray-400 mb-1 ">{getSeriesStatus(game)}</p> */}
                    <div className="flex flex-col text-sm">
                        <div className="flex justify-start items-center">
                            <RadioButtonComponent 
                                changed={radioChangeHandler}
                                id="1"
                                isSelected={winner === homeTeam}
                                label={homeTeam}
                                value={homeTeam}
                            />
                           
                        </div>     
                       
                    </div>
                    
                    <div className="flex flex-row text-sm">
                        <div className="flex justify-start items-center">
                            <RadioButtonComponent 
                                    changed={radioChangeHandler}
                                    id="2"
                                    isSelected={winner === awayTeam}
                                    label={awayTeam}
                                    value={awayTeam}
                            />
                        </div>          
                    </div>
                    <div className="flex flex-col bg-gray-100 items-center">  
                        <p className="flex text-xs ">{GetStadiumName(game.StadiumID).Name}</p>
                    </div>
                </div>         
            </div> 
            <div className="flex flex-col items-left justify-center mb-4">
                <p className={`mx-1 ${getWinnerFontColor(game, game.HomeTeam)}`}>{!game.HomeTeamScore?`     `:game.HomeTeamScore}</p> 
                <p className={`mx-1 ${getWinnerFontColor(game, game.AwayTeam)}`}>{!game.AwayTeamScore?`     `:game.AwayTeamScore}</p>
            </div>
            <div className={`flex flex-col border-l-2 ${statusColor.border} items-center justify-center w-36`}>       
                <div className={`flex text-sm`}>
                    {game.DateTime === null?"Pas fixée":moment(game.DateTime).format('LT')}
                </div>
                <div className={`flex text-center text-xs ${getObjectColorByDateTime(game)}`}>
                    {game.Status.toString().startsWith("F")
                    ? timeAgo(moment(game.GameEndDateTime))
                    : translateStatus(game.Status)}
                </div>
                <div className={`flex text-xs ${statusColor.text}`}>
                    {game.Status === "F/OT"?"PROL":""}
                </div>
            </div>             
        </div>
    );
}

const GameComponent = () => {
    const {series, loading} = useContext(GameContext);

    return (   
        (series.length == 0 || series === undefined || series === null)
        ?<div className="flex justify-center p-5">
            <img className="w-8 animate-ping" src="./images/bball-heart.png"/>          
         </div>
        :<div className="md:grid md:grid-cols-3 md:gap-2 flex flex-col justify-center items-center">
            {series.map((g, id) => (
                 <Game key={id} game = {g} ></Game>
            ))}   
         </div>
    );
}

export default GameComponent;