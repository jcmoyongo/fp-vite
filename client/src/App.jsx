import {useState, useContext, useRef} from "react";
import {SelectComponent, GameComponent, Navbar} from "./components"
import { GameContext } from "./context/GameContext";
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { IoMdCopy } from "react-icons/io";
import { MdOutlineAttachEmail, MdOutlineShare, MdFacebook} from "react-icons/md";
import { AiOutlineSchedule} from "react-icons/ai";
import Popup from "react-animated-popup"
import html2canvas from 'html2canvas';
import moment from "moment";
import styles, { layout } from "./style";

const App = () => {
  const {isAllBets, bets, selectedDate} = useContext(GameContext);
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState(true);

  const printRef = useRef(null);
  const MakeHashTag = () => {return bets.join("|") + "\n#Pari" + new Date(selectedDate).toDateString().replace(/\s+/g, "");}

  const handleCopy = (e) => {
    const text = MakeHashTag();
    navigator.clipboard.writeText(text);
    <Popup animationDuration={50} visible={isVisible} onClose={() => setIsVisible(false)}>
      <p>Vos paris ont été copiés!</p>
    </Popup>
  };

  const handleScreenShot = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');

    const cbData = [new ClipboardItem({[data.type]: data})];
    //navigator.clipboard.write(cbData); console.log(cbData);

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = `prg_${moment({selectedDate}).format('MMMM_Do_YYYY')}.png`;
      //console.log(`prg_${moment({selectedDate}).format('MMMM_Do_YYYY')}.png`);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  const handleLogin = () => { 
    setUser(false);
    console.log("Clicked");
  }

  return (  
    <div className="min-h-[210px] sm:px-0 sm:min-w-[360px]" >
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />    
            <section id="acceuil"> 
              <div className="flex  light-green xl:max-w-[1280px] w-full">
                    <div className="flex w-full justify-center items-center">
                        <div>
                          <div className="flex flex-row items-center my-1 w-full text-w">
                            <SelectComponent />
                            {selectedDate !== null && (
                                <button type="button" className="text-white bg-orange-300 hover:bg-[#00a2c7]/90 focus:ring-2 
                                  focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-md text-sm 
                                  text-center inline-flex items-center dark:focus:ring-[#3b5998]/55" onClick={handleScreenShot}>
                                  <MdOutlineShare className="rounded" color="c74a02" size={32} ></MdOutlineShare>
                                  <AiOutlineSchedule className="rounded" color="c74a02" size={32} ></AiOutlineSchedule>
                                  <MdFacebook className="rounded" color="blue" size={32} ></MdFacebook>
                                </button>
                            )}
                          </div>   
                          <GameComponent />
                          {isAllBets && (
                            <div  className="border-2 border-orange-600 my-1 light-green border:animate-pulse"> 
                                <p className="text-xs text-white m-1 dark-green">{
                                  bets.length > 0 
                                  ? <p className="animate-pulse">Partagez vos paris. Bonne chance! &#128512;</p> 
                                  : <p className="animate-pulse">Désolé, les paris sont fermés!&#129488;</p>}</p>
                                {bets.length > 0 && (
                                <div className="flex w-full items-center p-2">
                                    <div>
                                        <FacebookShareButton
                                          url=""
                                          quote={"My quote"}
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
                                    <div className="flex-1 flex flex-row flex-wrap justify-end items-center gap-1 m-1">
                                          {bets.map((b, id) => ( 
                                              <div className="border rounded p-1 dark-green text-white" > {b} </div>
                                          ))}   
                                    </div>         
                                </div>   
                      ) }                      
                            </div> 
                            )}
                        </div>
                    </div>  
              </div>       
            </section>
            <div className="flex-row gradient-bg-welcome items-center text-xl font-bold text-white">
                <div className="grid grid-flow-col items-center">
                  <img className="w-32" src="./images/logo-fp.png"/>
                  <span>Franchise Players - Playoff NBA  {new Date().getFullYear()} </span>
                </div>
            </div>
            <div className="grid grid-rows">
              <div className="flex flex-col items-center dark-green rounded-b-lg p-2 text-white text-xs ">               
                    <a href="mailto:admin@franchise-players.com?subject=Depuis Franchise Players">
                      <div className="flex flex-row items-center">                       
                          <p>Nous écrire&nbsp;</p>
                          <MdOutlineAttachEmail />
                        </div>  
                    </a>                      
                  <p>
                    <a href="https://www.3jinformatics.com/" target="_blank" className="text-white visited:text-orange-500">3J Informatics, LLC.</a>
                  </p>
                  <p>&copy; Copyright {new Date().getFullYear()}, All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>


    </div>
  )
}

export default App;