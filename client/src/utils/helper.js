import {useContext} from "react";
import {GameContext} from "../context/GameContext"
import stadiums from "./stadiums";
import teams from '../utils/teams'; 

export const SeasonType = {
        Regular: 1,
        Preseason: 2, 
        Postseason: 3, 
        Offseason: 4,
        AllStar: 4
};

export const GameStatus = {
    Final: 0,
    InProgress: 1,
    Scheduled: 2,
    FinalOT: 3
}

//The type of season that this record corresponds to (1=Regular Season, 2=Preseason, 3=Postseason, 4=Offseason, 5=AllStar).
export const  GetTeamName = (acro, what = 0) => {
    const {teamList} = useContext(GameContext);   

    try {     
        const team = teamList.find(t=>t.Acronym.toString().startsWith(acro));

        switch(what) {
            case 0:
                return team.NickName;
            case 1:
                return team.Name;
            default:
                return team.NickName;
          }
    } catch(error){
        console.log(error);
        return "";
    }   
}

export const  GetTeamAcronym = (name) => {

    try {     
        return name === undefined? "": teams.find(t => t.NickName === name).Acronym
    } catch(error){
        console.log(error);
        return "";
    }   
}

export const GetStadiumName = (id) => {
    try {
        return stadiums.map(stadium => stadium).find(s => s.StadiumID === id);
    } catch(error){
        console.log(error);
        return "";
    }
}

export const ArrayToString = (arr, separator) => {
    try {
        const j = arr === undefined?"": arr.join(separator);
        return j === separator? j:"";
    } catch(error){
        console.log(error);
        return "";
    }
}

export const getStatusColor = (status) => {
    //{`flex justify-center text-sm w-32 text-${color}-500`}>
    try {     

        switch(status) {
            case "Final":
                return "text-red-600";
            case "F/OT":
                return "text-red-600";
            case "InProgress":
                return "text-green-600"
            case "Scheduled":
                 return "text-blue-600"
            default:
                return "";
          }
    } catch(error){
        console.log(error);
        return "";
    }   
}

export const getWinnerFontColor = (game, team) => {
    //{`flex justify-center text-sm w-32 text-${color}-500`}>
    try {     
        switch(team) {
            case game.HomeTeam:
                return game.HomeTeamScore < game.AwayTeamScore?"text-gray-400":"";
            case game.AwayTeam:
                return game.AwayTeamScore < game.HomeTeamScore?"text-gray-400":"";
            default:
                return "";
          }
    } catch(error){
        console.log(error);
        return "";
    }   
}

export const getSeriesStatus = (game) => {
    const series = game.SeriesInfo;
    let message;
    if (series.GameNumber === undefined || series.GameNumber === 0) { message = "Série en attente (0 - 0 )"}
    if (series.GameNumber > 0) {
        if (series.HomeTeamWins > series.AwayTeamWins) {
            message = `Match ${series.GameNumber} (${game.HomeTeam} mène ${series.HomeTeamWins} - ${series.AwayTeamWins})`
        } else if (series.HomeTeamWins < series.AwayTeamWins) {
            message = `Match ${series.GameNumber} (${game.AwayTeam} mène ${series.AwayTeamWins} - ${series.HomeTeamWins})`
        } else {
            message = `Match ${series.GameNumber} (Série à égalité ${series.HomeTeamWins} - ${series.AwayTeamWins})`
        }
    }
    return message;
}
