import React, {useContext, useState, useEffect} from "react";
import { GameContext } from "../context/GameContext";
import {RadioButtonComponent} from "../components/RadioButton"
import {GetStadiumName, GetTeamAcronym, GetTeamName} from "../utils/helper";
import moment from "moment";
import {getStatusColor} from '../utils/helper'


const Game = ({game}) =>{
    const [winner, setWinner] = useState();
    const {setGameList, dayGames, setIsAllBets, setBets, series} = useContext(GameContext);
    const [color, setColor] = useState();

    const radioChangeHandler = (e) => {
        //Update the winner in the day's list.
        setWinner(e.target.value);
        game.Winner = GetTeamAcronym( e.target.value);
        //Update the game list with the latest winner
        setGameList(dayGames);
        //This is how we know a winner has been selected for all of the day's games.
        const isAllBets = series.every(g => g.Winner !== "");
        setIsAllBets(isAllBets)

        const dayBets = series.filter(g => g.Status == "Scheduled").map(g => g.Winner);
        setBets(dayBets);
    };

    const homeTeam = GetTeamName(game.HomeTeam);
    const awayTeam = GetTeamName(game.AwayTeam);

    useEffect(() => { setColor(getStatusColor(game.Status))});

    return (
        <div className="flex flex-row bg-white odd:bg-gray-50 rounded white-glassmorphism p-2 cursor-pointer w-full hover:shadow-xl">
            <div className="flex flex-row items-center">
                <div className="flex flex-col">
                    <div className="flex row text-sm">
                        <div className="flex justify-start items-center w-full">
                            <RadioButtonComponent 
                                changed={radioChangeHandler}
                                id="1"
                                isSelected={winner === homeTeam}
                                label={homeTeam}
                                value={homeTeam}
                            />
                        </div>
                        <a className="flex mx-1 text-left">{game.HomeTeamScore}</a>
                        <a className="mx-1">{game.SeriesInfo.HomeTeamWins}-{game.SeriesInfo.AwayTeamWins}</a>
                    </div>
                    <div className="flex row text-sm">
                        <div className="flex justify-start items-center w-60">
                            <RadioButtonComponent 
                                    changed={radioChangeHandler}
                                    id="2"
                                    isSelected={winner === awayTeam}
                                    label={awayTeam}
                                    value={awayTeam}
                            />
                        </div>
                        <a className="mx-1">{game.AwayTeamScore}</a>
                        <a className="mx-1">{game.SeriesInfo.AwayTeamWins}-{game.SeriesInfo.HomeTeamWins}</a>
                    </div>
                </div>      
                <div className="flex flex-col border">       
                    <div className="flex justify-center text-sm w-32">
                        {moment(game.DateTime).format('LT')}
                    </div>
                    <div className={`flex justify-center text-sm ${color}`}>
                        {game.Status.toString().toString().startsWith("Final")
                        ? moment(game.DateTime).startOf('hour').fromNow()
                        : game.Status}
                    </div>
                </div>
                <div className="flex justify-end text-sm">
                    <p className="flex text-right p-1">{GetStadiumName(game.StadiumID).Name}</p>
                </div>
            </div>
            
        </div>
    );
}

const GridGame = ({game}) => {
    const [winner, setWinner] = useState();
    const {setGameList, dayGames, setIsAllBets, setBets, series} = useContext(GameContext);
    const [color, setColor] = useState();

    const homeTeam = GetTeamName(game.HomeTeam);
    const awayTeam = GetTeamName(game.AwayTeam);

    const serieStatus = () => {
        const serieInfo = game.serieInfo;
        let message;
        if (serieInfo.HomeTeamWins === null & serieInfo.AwayTeamWins === null) {
            message = ""
        }
    }
    return (
        <div className="grid grid-rows-3 border text-sm bg-blue-600 m-1 p-1 w-full">
            <div  className="border  bg-gray-300"> {moment(game.DateTime).format('LT')}&nbsp;{GetStadiumName(game.StadiumID).Name}</div>
                <div className="grid grid-cols-3 border bg-gray-500 justify-items-start">
                    <RadioButtonComponent 
                                changed={radioChangeHandler}
                                id="1"
                                isSelected={winner === homeTeam}
                                label={homeTeam}
                                value={homeTeam}/>
                    <div className="flex items-center ">
                        {game.HomeTeamScore}
                    </div>
                    <div className="flex items-center">
                        {game.SeriesInfo.HomeTeamWins}
                    </div>
                </div>
                <div className="grid grid-cols-3 border bg-gray-500 justify-items-start">
                    <div className="flex justify-start items-center w-60">
                            <RadioButtonComponent 
                                    changed={radioChangeHandler}
                                    id="2"
                                    isSelected={winner === awayTeam}
                                    label={awayTeam}
                                    value={awayTeam}/>
                        </div>
                    <div className="flex items-center ">
                        {game.AwayTeamScore}
                    </div>
                    <div className="flex items-center">
                        {game.SeriesInfo.AwayTeamWins}
                    </div>
                </div>

        </div>
    )
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
                 <GridGame key={id} game = {g} ></GridGame>
            ))}   
         </div>
    );
}

export default GameComponent;