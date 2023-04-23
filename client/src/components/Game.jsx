import React, {useContext, useState, useEffect} from "react";
import { GameContext } from "../context/GameContext";
import {RadioButtonComponent} from "../components/RadioButton"
import {GetStadiumName, GetTeamAcronym, GetTeamName} from "../utils/helper";
import moment from "moment";
import 'moment/locale/fr';
import {getStatusColor, getSeriesStatus, getWinnerFontColor, translateStatus, timeAgo} from '../utils/helper'

const Game = ({game}) =>{
    const [winner, setWinner] = useState();
    const {setGameList, dayGames, setIsAllBets, setBets, series} = useContext(GameContext);
    const [color, setColor] = useState();
    const [seriesStatus, setSeriesStatus] = useState("");

    const radioChangeHandler = (e) => {
        //Update the winner in the day's list.
        setWinner(e.target.value);
        game.Winner = GetTeamAcronym( e.target.value);
        //Update the game list with the latest winner
        setGameList(dayGames);
        //This is how we know a winner has been selected for all of the day's games.
        const isAllBets = series.every(g => g.Winner !== "");
        setIsAllBets(isAllBets);

        const dayBets = series.filter(g => g.Status == "Scheduled").map(g => g.Winner);
        setBets(dayBets);
    };

    const homeTeam = GetTeamName(game.HomeTeam);
    const awayTeam = GetTeamName(game.AwayTeam);

    useEffect(() => { 
        setColor(getStatusColor(game.Status));
        //getSeriesStatus();
    }, [game]);

    return (
        <div className="flex flex-row w-full bg-white odd:bg-gray-50 border p-1 mb-1 hover:shadow-xl">
            <div className="flex flex-row items-center w-full">
                <div className="flex flex-col w-full">
                    <p className="text-xs text-gray-400 mb-1 ">{getSeriesStatus(game)}</p>
                    <div className="flex flex-row text-sm">
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
                    <div className="flex flex-col border-t-2 bg-gray-100 items-center ">  
                        <p className="flex text-xs ">{GetStadiumName(game.StadiumID).Name}</p>
                    </div>
                </div>         
            </div> 
            <div className="flex flex-col items-left justify-center w-16">
                <p className={`mx-1  ${getWinnerFontColor(game, game.HomeTeam)}`}>{game.HomeTeamScore}</p>
                <p className={`mx-1  ${getWinnerFontColor(game, game.AwayTeam)}`}>{game.AwayTeamScore}</p>
            </div>
            <div className="flex flex-col border-l-2 items-center justify-center w-36">       
                <div className="flex text-sm">
                    {game.DateTime === null?"Pas fixée":moment(game.DateTime).format('LT')}
                </div>
                <div className={`flex text-center text-xs ${color}`}>
                    {game.Status.toString().startsWith("F")
                    ? timeAgo(moment(game.GameEndDateTime))
                    : translateStatus(game.Status)}
                </div>
                <div className={`flex text-xs ${color}`}>
                    {game.Status === "F/OT"?"PROL":""}
                </div>
            </div>             
        </div>
    );
}

const GameComponent = () => {
   // const {dayGames, series} = useContext(GameContext);
    const {series} = useContext(GameContext);
    //console.log(series);

    return (   
        (series.length == 0 || series === undefined || series === null)
        ?<div className="flex justify-center p-5">
            <img className="w-8 animate-ping" src="./images/basketball.png"/>          
         </div>
        :<div className="flex-1 flex flex-col justify-center items-center">
            {series.map((g, id) => (
                 <Game key={id} game = {g} ></Game>
            ))}   
         </div>
    );
}

export default GameComponent;