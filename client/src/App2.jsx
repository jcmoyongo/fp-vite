import {useState, useContext, useRef} from "react";
import {SelectComponent, GameComponent} from "./components"
import { GameContext } from "./context/GameContext";
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { IoMdCopy } from "react-icons/io";
import { MdOutlineAttachEmail, MdOutlineShare, MdFacebook} from "react-icons/md";
import { AiOutlineSchedule} from "react-icons/ai";
import Popup from "react-animated-popup"
import html2canvas from 'html2canvas';
import moment from "moment";


const App = () => {
  const {isAllBets, bets, selectedDate} = useContext(GameContext);
  const [isVisible, setIsVisible] = useState(false);

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

  return (  
    <div className="min-h-[70px] sm:px-0 sm:min-w-[120px]" >
        <div className="grid grid-rows mt-5">
            <div className="flex-col gradient-bg-welcome rounded-t-lg mx-5 p-2 items-center text-xl font-bold text-white">
                <div className="grid grid-flow-col items-center">
                  <img className="w-32 justify-items-start" src="./images/fp_120.png"/>
                  <span>Franchise Players - Playoff NBA  {new Date().getFullYear()} </span>
                </div>
                <div className="">
                    <span className="text-xs">Tino Moyongo </span>
                    <img className="w-16 justify-end " src="./images/fp_120.png"/>
                </div>
            </div>

            <div className="flexitems-center light-green mx-5 ">
                <div className="flex w-full justify-center items-center">
                    <div>
                      <div className="flex flex-row items-center my-1 w-full">
                        <SelectComponent />

                      </div>   

                    </div>
                </div>  
            </div>
            <div className="flex flex-col items-center dark-green rounded-b-lg mx-5 p-2 text-white text-xs ">               
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
  )
}

export default App;