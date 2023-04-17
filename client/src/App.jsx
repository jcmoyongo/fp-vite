import {useState, useContext} from "react";
import {SelectComponent, GameComponent} from "./components"
import { GameContext } from "./context/GameContext";
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { ArrayToString } from "./utils/helper";
import { IoMdCopy, IoLogoFacebook } from "react-icons/io";
import moment from "moment";
import Popup from 'react-animated-popup'

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const App = () => {
  const [visible, setVisible] = useState(false)
  const [buttonMessage, setButtonMessage] = useState("Parier");
  const {isAllBets, dayGames, bets, selectedDate} = useContext(GameContext);

  const MakeHashTag = () => {return bets.join("|") + "\n#Pari" + new Date(selectedDate).toDateString().replace(/\s+/g, "");}

  const handleCopy = (e) => {
    const text = MakeHashTag();
    navigator.clipboard.writeText(text);
    <Popup animationDuration={50} visible={visible} onClose={() => setVisible(false)}>
      <p>Vos paris ont été copiés!</p>
    </Popup>
    //console.log(text);
  };

  return (  
    <div className="min-h-max" >
        <div className="grid grid-rows-3-[10rem_10rem_1fr] mt-10">
            <div className="flex gradient-bg-welcome rounded-t-lg mx-8 p-2 flex justify-start items-center text-xl font-light text-white">
                <img className="w-32" src="./images/fp_120.png"/>
                Franchise Players - Playoff ccc NBA  Saison {new Date().getFullYear()} 
            </div>
            <div className="flex light-green mx-8 p-2 min-h-100 h-100">
                <div className="flex w-full justify-center items-center">
                    <div >
                      <SelectComponent/>
                      <GameComponent></GameComponent>
                      {isAllBets &&  isPastDate (
                        <div className="flex justify-center p-5">
                          <img className="w-8 animate-ping" src="./images/basketball.png"/>          
                        </div>
                      )}
                      {isAllBets && !isPastDate (
                        <div className="border-2 border-orange-600 rounded mt-2 light-green box "> 
                            <p className="text-xs text-white m-1 dark-green">Partagez vos paris</p>
                            <div className="flex w-full items-center p-2 m">
                                <div>
                                    <FacebookShareButton
                                      url="https://www.facebook.com/groups/680010455356375"
                                      quote="My quote"
                                      hashtag={MakeHashTag()}
                                      >
                                        <FacebookIcon size={32} round onClick={() =>  navigator.clipboard.writeText(bets.join("|"))}/>
                                      </FacebookShareButton>
                                 </div>
                                 <IoMdCopy className="hover:bg-orange-400 rounded" size={32} alt="Copy" onClick={() => handleCopy()}></IoMdCopy>                             
                                 <a href="https://www.facebook.com/groups/680010455356375" target="_blank">
                                  <div>
                                    <img className="w-8 border hover:bg-orange-400 rounded" src="/images/fp_120.png"/>
                                  </div>
                                 </a>
                                 <div className="flex-1 flex flex-row flex-wrap justify-end  items-center gap-1 m-1">
                                      {bets.map((b, id) => ( 
                                          <div className="border rounded p-1 dark-green text-white" > {b} </div>
                                      ))}   
                                 </div>         
                            </div>                         
                        </div> 
                        )}
                    </div>
                </div>  
            </div>
            <div className="flex dark-green rounded-b-lg mx-8 p-2 justify-between font-light">             
                <p className="text-white text-left text-xs">
                  <a href="https://www.3jinformatics.com/" target="_blank" className="text-white visited:text-purple-500">3J Informatics, LLC</a>
                </p>
                <p className="text-white text-right text-xs">&copy; Copyright {new Date().getFullYear()}, All rights reserved</p>
            </div>
        </div>
    </div>
  )
}

export default App;