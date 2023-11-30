import { standingsAPI, currentSeason, seasonType, sportsDataIOAPIKey } from "../utils/constants";
import React, { useEffect, useState, useContext } from "react";
import confStandings from "../utils/standings2";
import allStandings from "../utils/standings";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { GameContext } from "../context/GameContext";

const Standing = ({name, toggle, data}) => {
    const [toggleExpansion, setToggleStandings] = useState(toggle);
    const { dataIOCallStatus } = useContext(GameContext);

    return (
        <div className="">
            <div className={`conf_header flex flex-row ${name=='Eastern Conference' && 'mt-1'}  hover:text-[#00a2c7] hover:cursor-pointer border-t`} 
                onClick={() => {setToggleStandings(!toggleExpansion); /*console.log(toggleExpansion);*/}}>
                <h2 className=" ml-2 mr-2 w-40">{name}</h2>           
                <div type="button" className="px-2 rounded-[2px] ">
                    {!toggleExpansion && (<MdExpandLess className="h-8 w-8"  />)}
                    {toggleExpansion && (<MdExpandMore className="h-8 w-8"  />)}
                </div>
            </div>
            {toggleExpansion && (
                <div className="table w-full bordered text-xs md:text-sm">
                    <div className="table-header-group">
                        <div className="table-row">
                            <div className="table-cell text-left border-r border-b pl-2 w-1/3">ÉQUIPE</div>
                            <div className="table-cell text-right border-b w-1/12">G</div>
                            <div className="table-cell text-right border-b w-1/12">P</div>
                            <div className="table-cell text-right border-b w-1/12">%GAGNÉ</div>
                            <div className="table-cell text-right border-b w-1/12">DERR</div>
                            <div className="table-cell text-right border-b w-1/12">EST</div>
                            <div className="table-cell text-right border-b pr-2 w-1/12">OUEST</div>
                        </div>
                    </div> 
                    <div className="table-row-group">
                        {data.map((stdg, i) => (
                            <div className={`table-row border-b ${(i == 5 || i == 9) && ' border-blue-700'} 
                                ${i==5 && 'border-dashed'}  hover:bg-green-50`} key={i}>
                                <div className="table-cell text-left border-r pl-2">
                                    <div className="flex flex-row items-center">
                                        <span className=" font-bold w-6">{i+1}</span>
                                        <div>
                                            <div >
                                                <img className="team_stdg_img p-1" src={`/images/teams/${stdg.Name}.png`} title=" Logo" alt=" Logo" loading="lazy" />
                                            </div>
                                        </div>                            
                                        <span className=" team_name text-blue-700" >{stdg.Name}</span>
                                    </div>
                                </div>
                                <div className="table-cell text-right">{stdg.Wins}</div>
                                <div className="table-cell text-right">{stdg.Losses}</div>
                                <div className="table-cell text-right">{stdg.Percentage}</div>
                                <div className="table-cell text-right">{stdg.GamesBack}</div>
                                <div className="table-cell text-right">{stdg.ConferenceWins}-{stdg.ConferenceLosses}</div>
                                <div className="table-cell text-right pr-2">{stdg.Wins-stdg.ConferenceWins}-{stdg.Losses-stdg.ConferenceLosses}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

    </div>
    )
}

const Standings = () => {
    const [time, setTime] = useState(new Date());
    const [eastStandings, setEastStandings] =  useState([]);
    const [westStandings, setWestStandings] =  useState([]);
    const [toggleEast, setToggleEast] =  useState(false);
    const [toggleWest, setToggleWest] =  useState(false);

    const downloaStandings = async () => {
        try {
                const endpoint =  `${standingsAPI}${seasonType}${currentSeason}?key=${sportsDataIOAPIKey}`; 

                const response = await fetch(endpoint);
                const data = await response.json();
    
                const eStandings = data
                        .map(s => s)
                        .sort((a,b) => b.Percentage - a.Percentage )
                        .filter(s => s.Conference == "Eastern");
                setEastStandings(eStandings);

                const wStandings = data
                        .map(s => s)
                        .sort((a,b) =>  b.Percentage - a.Percentage)
                        .filter(s => s.Conference == "Western");
                setWestStandings(wStandings);

        } catch(error){
            console.log(error);
        }
        finally {
            
        }
    }

    useEffect(() => {
        // console.log("Entering useEffect");
        // const interval = setInterval(() => {
        // setTime(new Date());
        // }, 5000);
        setTime(new Date());
        downloaStandings();
        // return () => clearInterval(interval);
    }, [JSON.stringify(eastStandings), JSON.stringify(westStandings)]);

    // return <p className="text-white">The current time is: {time.toLocaleTimeString()}</p>;

    return (
        <div className="bg-[#e5faff]">
            <Standing name="Conférence Est" toggle={toggleEast} data = {eastStandings} />
            <Standing name="Conférence Ouest" toggle={toggleWest} data = {westStandings} />
        </div>
    );
}

export default Standings;