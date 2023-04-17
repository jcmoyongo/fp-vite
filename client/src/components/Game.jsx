import React, {useContext, useState, useEffect} from "react";
import { GameContext } from "../context/GameContext";
import {RadioButtonComponent} from "../components/RadioButton"
import {GetStadiumName, GetTeamAcronym, GetTeamName} from "../utils/helper";
import moment from "moment";
import {MdSportsBasketball, MdOutlineSportsBasketball} from 'react-icons/md'

const Game = ({game}) =>{
    const [winner, setWinner] = useState();
    const {setGameList, dayGames, setIsAllBets, setBets} = useContext(GameContext);

    const radioChangeHandler = (e) => {
        //Update the winner in the day's list.
        setWinner(e.target.value);
        game.Winner = GetTeamAcronym( e.target.value);
        //Update the game list with the latest winner
        setGameList(dayGames);
        //This is how we know a winner has been selected for all of the day's games.
        const allBets = dayGames.every(g => g.Winner !== "");
        setIsAllBets(allBets)
        const dayBets = dayGames.map(g => g.Winner);
        setBets(dayBets);
       // console.log([...dayBets, ...dayBets, ...dayBets, ...dayBets]);
    };

    const homeTeam = GetTeamName(game.HomeTeam);
    const awayTeam = GetTeamName(game.AwayTeam);

    return (
        <div className="flex flex-row bg-white odd:bg-gray-50 rounded white-glassmorphism p-2 cursor-pointer w-full hover:shadow-xl">
            <div className="flex flex-row items-center">
                <div className="flex flex-col">
                    <div className="flex justify-start items-center w-full">
                        <RadioButtonComponent 
                            changed={radioChangeHandler}
                            id="1"
                            isSelected={winner === homeTeam}
                            label={homeTeam}
                            value={homeTeam}
                        />
                    </div>
                    <div className="flex justify-start items-center w-40">
                        <RadioButtonComponent 
                                changed={radioChangeHandler}
                                id="2"
                                isSelected={winner === awayTeam}
                                label={awayTeam}
                                value={awayTeam}
                        />
                    </div>
                </div>             
                <div className="flex justify-start text-sm w-32">
                    {moment(game.DateTime).format('LT')}
                </div>
                <div className="flex justify-start text-sm">
                    <p className=" flex text-left">{GetStadiumName(game.StadiumID).Name}</p>
                </div>
            </div>
        </div>
    );
}
const GameComponent = () => {
    const {dayGames} = useContext(GameContext);

    return (   
        (dayGames.length == 0 || dayGames === undefined || dayGames === null)
        ?<div className="flex justify-center p-5">
            <img className="w-8 animate-ping" src="./images/basketball.png"/>          
         </div>
        :<div className="flex-1 flex flex-col justify-center items-center">
            {dayGames.map((g, id) => (
                <Game key={id} game = {g} ></Game>
            ))}   
         </div>
    );
}

export default GameComponent;