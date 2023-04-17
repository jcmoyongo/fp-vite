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


