import { standingsAPI, currentSeason, seasonType, sportsDataIOAPIKey } from "../utils/constants";
import React, { useEffect, useState } from "react";
import confStandings from "../utils/standings2";
import allStandings from "../utils/standings";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const Standing = ({name, toggle, data}) => {
    const [toggleStandings, setToggleStandings] = useState(toggle);

    return (
        <div className="bg-blue-gradient">
            <div className="conf_header flex flex-row pt-6">
                <h2 className=" ml-2 mr-2">{name}</h2>           
                <button type="button" className="px-2 rounded-[2px]  hover:bg-orange-400" 
                    onClick={() => {setToggleStandings(!toggleStandings); console.log(toggleStandings);}}>
                    {!toggleStandings && (<MdExpandLess className="h-8 w-8"  />)}
                    {toggleStandings && (<MdExpandMore className="h-8 w-8"  />)}
                </button>
            </div>
            {toggleStandings ? (
                            <div className="table w-full bordered text-xs md:text-sm collapse">
                            <div className="table-header-group">
                                <div className="table-row">
                                    <div className="table-cell text-left border-r border-b pl-2">TEAM</div>
                                    <div className="table-cell text-right border-b">W</div>
                                    <div className="table-cell text-right border-b">L</div>
                                    <div className="table-cell text-right border-b">WIN%</div>
                                    <div className="table-cell text-right border-b">GB</div>
                                    <div className="table-cell text-right border-b">EAST</div>
                                    <div className="table-cell text-right border-b pr-2">WEST</div>
                                </div>
                            </div> 
                            <div className="table-row-group">
                                {data.map((stdg, i) => (
                                    <div className="table-row border-b" key={i}>
                                        <div className="table-cell text-left border-r  pl-2">
                                            <div className="flex flex-row items-center">
                                                <span className=" font-bold w-8">{stdg.ConferenceRank}</span>
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
            ): (
                <div className="table w-full bordered text-xs md:text-sm">
                <div className="table-header-group">
                    <div className="table-row">
                        <div className="table-cell text-left border-r border-b pl-2">TEAM</div>
                        <div className="table-cell text-right border-b">W</div>
                        <div className="table-cell text-right border-b">L</div>
                        <div className="table-cell text-right border-b">WIN%</div>
                        <div className="table-cell text-right border-b">GB</div>
                        <div className="table-cell text-right border-b">EAST</div>
                        <div className="table-cell text-right border-b pr-2">WEST</div>
                    </div>
                </div> 
                <div className="table-row-group">
                    {data.map((stdg, i) => (
                        <div className="table-row border-b" key={i}>
                            <div className="table-cell text-left border-r  pl-2">
                                <div className="flex flex-row items-center">
                                    <span className=" font-bold w-8">{stdg.ConferenceRank}</span>
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
                // console.log(`Standings before sort ${standings}`);
                
                const response = await fetch(endpoint);
                const data = await response.json();
    
                const eStandings = data
                        .map(s => s)
                        .sort((a,b) => a.ConferenceRank - b.ConferenceRank)
                        .filter(s => s.Conference == "Eastern");
                setEastStandings(eStandings);

                const wStandings = data
                .map(s => s)
                .sort((a,b) => a.ConferenceRank - b.ConferenceRank)
                .filter(s => s.Conference == "Eastern");
                setEastStandings(eStandings);
                setWestStandings(wStandings);

        } catch(error){
            console.log(error);
        }
        finally {
            
        }
    }

    useEffect(() => {
        console.log("useEffect called");
        // const interval = setInterval(() => {
        // setTime(new Date());
        // }, 5000);
        setTime(new Date());
        downloaStandings();
        // return () => clearInterval(interval);
    }, [JSON.stringify(eastStandings)]);

    // return <p className="text-white">The current time is: {time.toLocaleTimeString()}</p>;

    return (
        <div>
            <Standing name="Eastern Conference" toggle={toggleEast} data = {eastStandings} />
            <Standing name="Western Conference" toggle={toggleWest} data = {westStandings} />
        </div>
    );
}

export default Standings;