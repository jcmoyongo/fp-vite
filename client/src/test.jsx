import {useState, useContext, useRef} from "react";
import {SelectComponent, GameComponent} from "./components"
import { GameContext } from "./context/GameContext";
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { ArrayToString } from "./utils/helper";
import { IoMdCopy, IoLogoFacebook } from "react-icons/io";
import { MdOutlineAttachEmail, MdOutlineShare, MdFacebook} from "react-icons/md";
import { GrSchedule, GrSchedulePlay} from "react-icons/gr";
import {AiFillSchedule, AiOutlineSchedule} from "react-icons/ai";
import Popup from "react-animated-popup"
import html2canvas from 'html2canvas';
import moment from "moment";



const Test = () => {

  return (  
    <div className="flex flex-col bg-white" >
        <div className="grid layout grid-rows-[10rem_30rem_5rem] m-5">
            <div className="bg-green-500">
                <img className="w-32" src="./images/fp_120.png"/>
                Franchise Players - Playoff NBA  {new Date().getFullYear()} 
            </div>
            <div className="bg-yellow-500">

            </div>
            <div className="bg-red-500">               

            </div>
        </div>
    </div>
  )
}

export default Test;