import {useContext} from "react";
import {GameContext} from "../context/GameContext"
import stadiums from "./stadiums";
import teams from '../utils/teams'; 
import schedule from './games_sd'

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
        console.log(`Stadium ID ${id} NOT FOUND ${error}`);
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
            case "NotNecessary":
                return "text-orange-600"
            default:
                return "";
          }
    } catch(error){
        console.log(error);
        return "";
    }   
}

export const translateStatus = (status) => {
    try {     
        switch(status) {
            case "Final":
                return "Terminé";
            case "F/OT":
                return "T/PROL";
            case "InProgress":
                return "En Cours"
            case "Scheduled":
                 return "Programmé"
            case "NotNecessary":
                return "Pas Nécessaire"
            case "Canceled":
                return "Annulé"
            default:
                return status;
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
            message = series.HomeTeamWins == 4
                ? `${game.HomeTeam} a gagné ${series.HomeTeamWins} - ${series.AwayTeamWins}`
                : `Match ${series.GameNumber} (${game.HomeTeam} mène ${series.HomeTeamWins} - ${series.AwayTeamWins})`;
        } else if (series.HomeTeamWins < series.AwayTeamWins) {
            message = series.AwayTeamWins == 4
            ? `${game.AwayTeam} a gagné ${series.AwayTeamWins} - ${series.HomeTeamWins}`
            : `Match ${series.GameNumber} (${game.AwayTeam} mène ${series.AwayTeamWins} - ${series.HomeTeamWins})`
        } else {
            message = `Match ${series.GameNumber} (Série à égalité ${series.HomeTeamWins} - ${series.AwayTeamWins})`
        }
    }
    return message;
}

export const timeAgo = (time) => {

    switch (typeof time) {
      case 'number':
        break;
      case 'string':
        time = new Date(time);
        break;
      case 'object':
        if (time.constructor === Date) time = time.getTime();
        break;
      default:
        time = new Date();
    }
    var time_formats = [
      [60, 'secondes', 1], // 60
      [120, '1 minute', 'Dans 1 minute'], // 60*2
      [3600, 'minutes', 60], // 60*60, 60
      [7200, '1 heure', 'Dans 1 heure'], // 60*60*2
      [172799, 'heures', 3600], // 60*60*24, 60*60 --ORIGINAL:   [86400, 'heures', 3600], // 60*60*24, 60*60
      [172800, 'Hier', 'Demain'], // 60*60*24*2
      [604800, 'jours', 86400], // 60*60*24*7, 60*60*24
      [1209600, '1 semaine', 'Prochaine sem'], // 60*60*24*7*4*2
      [2419200, 'semaines', 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, '1 mois', 'Mois prochain'], // 60*60*24*7*4*2
      [29030400, 'mois', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, '1 an', '-1 an'], // 60*60*24*7*4*12*2
      [2903040000, 'années', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, '1 siècle', '-1 siècle'], // 60*60*24*7*4*12*100*2
      [58060800000, 'siècle', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (new Date() - time) / 1000,
      token = '+',
      list_choice = 1;
    if (seconds == 0) {
      return 'Maintenant'
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = 'Dans';
      list_choice = 2;
    }
    var i = 0,
    format; 

    while (format = time_formats[i++])
      if (seconds < format[0]) {
        if (typeof format[2] == 'string')
          return format[list_choice];
        else
          return token + Math.floor(seconds / format[2]) + ' ' + format[1];
      }

    return time;
  }

  const lastUpdate = () => {
    const sched = games_sd.map(s => s);
     console.log(sched.map( g => {return moment(g.Updated).format('LLLL')}).reverse()[0]);
  }