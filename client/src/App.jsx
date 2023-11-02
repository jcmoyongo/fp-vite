import { useState, useContext, useRef } from "react";
import { SelectComponent, GameComponent, Navbar, socialMedia, StandingComponent, Profile, Banner } from "./components"
import { GameContext } from "./context/GameContext";
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { IoMdCopy } from "react-icons/io";
import { MdOutlineAttachEmail, MdOutlineShare, MdFacebook } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaRegSmile} from "react-icons/fa";
import Popup from "react-animated-popup"
import html2canvas from 'html2canvas';
import moment from "moment";
import styles, { layout } from "./style";
// import Profile from "./components/Profile";
import Select from 'react-select';

const App = () => {
  const {isAllBets, bets, selectedDate, dataIOCallStatus} = useContext(GameContext);
  const [isVisible, setIsVisible] = useState(false);
  const [separatorOption, setSeparatorOption] = useState(null);
  const [repetionOption, setRepetionOption] = useState(null);
  const [avantApres, setAvantApres] = useState(false);
  const [isClearable, setIsClearable] = useState(true);

  const printRef = useRef(null);
  const optionsSeparateur = [
    { value: 'pipe', label: '|    Barre v.' },
    { value: 'dash', label: '-    Tirait' },
    { value: 'colon', label: ':   2 pts.' }, 
    { value: 'space', label: "' ' Espace" }
  ];
  const optionsRepeter = [
    { value: '1', label: '1x' },
    { value: '2', label: '2x' },
    { value: '3', label: '3x' }
  ];

  const MakeHashTag = () => {
    const separator = separatorOption === null ? "|" : separatorOption.value;
    const repetition = repetionOption === null ? 1 : repetionOption.value;
    const reps = Array(repetition).fill(separator);
    let _bets = bets.join(reps);
    avantApres && (_bets = reps + _bets + reps);

    console.log(repetition);
    console.log(reps);
    console.log(_bets);

    return bets.join(" | ") + "\n" + " \n" + new Date(selectedDate).toLocaleDateString("fr-FR").replace(/\s+/g, "") + 
    " depuis https://www.franchise-players.com";
  }

  const handleCopy = (e) => {
    const text = MakeHashTag();
    navigator.clipboard.writeText(text);
    <Popup animationDuration={50} visible={isVisible} onClose={() => setIsVisible(false)}>
      <p>Votre pari a été copié dans le presse-papier!</p>
    </Popup>
  };

  const downloadSchedule = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/png', 1);
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

  const handleSeparatorChange = (e) => {
    if (e === null) {
      setSeparatorOption(null)
    }
    else {
      console.log
      setSeparatorOption(e.value)
    }
  }

  const handleRepetitionChange = (e) => {
    if (e === null) {
      setRepetionOption(null)
    }
    else {
      setRepetionOption(e.value)
    }
  }

  const handleAvantApresChange = (e) => {
    setAvantApres(!e.value)
  }
  
  return (  
    <div className="min-h-[210px] sm:px-0 sm:min-w-[360px]" >
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <section id="acceuil"> 
              <Profile />
              {dataIOCallStatus.statusCode == 403 && <Banner message = {dataIOCallStatus.message.split(" ").reverse()[0]} />}
              <Navbar />    
              <div className="flex light-green xl:max-w-[1280px] w-full">
                    <div className="flex w-full justify-center items-center">
                        <div className=" ">
                          <div className="flex flex-row items-center my-1 w-full">
                            <SelectComponent />
                            {selectedDate !== null && (
                                <button type="button" className="text-white bg-orange-300 hover:bg-[#00a2c7]/90 focus:ring-2 
                                  focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-md text-sm 
                                  text-center inline-flex items-center dark:focus:ring-[#3b5998]/55" 
                                  title="Télécharger le programme"
                                  onClick={downloadSchedule}>
                                  <MdOutlineShare className="rounded" color="c74a02" size={32} ></MdOutlineShare>
                                  <AiOutlineSchedule className="rounded" color="c74a02" size={32} ></AiOutlineSchedule>
                                  <MdFacebook className="rounded" color="blue" size={32} ></MdFacebook>
                                </button>
                            )}
                          </div>   
                          <GameComponent />
                          {isAllBets && (
                            <div  className="border rounded border-orange-600 my-1 md:mx-1 light-green border:animate-pulse"> 
                                <div className="text-xs text-white m-1 dark-green">
                                  <div className="flex my-1 w-full text-sm p-1 font">
                                      <Select
                                        className="flex basic-single rounded-lg text-black text-xs mr-1"
                                        placeholder="Séparateur..."
                                        classNamePrefix="select"
                                        defaultValue={{ value: 'pipe', label: '|    Barre v.' }}
                                        isClearable={isClearable}
                                        onChange={handleSeparatorChange}
                                        options={ optionsSeparateur }
                                        theme={(theme) => ({
                                            ...theme,
                                            borderRadius: 5,
                                            colors: {
                                              ...theme.colors,
                                              primary25: '#e5faff',
                                              primary: '#00a2c7',
                                            },
                                          })}
                                        /> 
                                      <Select
                                        className="flex basic-single rounded-lg text-black text-xs mr-1"
                                        placeholder="Répéter..."
                                       classNamePrefix="select"
                                        defaultValue= {{ value: '1', label: '1x' }}
                                        isClearable={isClearable}
                                        onChange={handleRepetitionChange}
                                        options={ optionsRepeter }
                                        theme={(theme) => ({
                                            ...theme,
                                            borderRadius: 5,
                                            colors: {
                                              ...theme.colors,
                                              primary25: '#e5faff',
                                              primary: '#00a2c7',
                                            },
                                          })}
                                        /> 
                                      <div className="flex justify-center items-start md:items-center text-xs flex-col md:flex-row ">
                                        <input className="" type="checkbox" onChange={handleAvantApresChange}  />
                                        <label >Sép. avant et après</label>
                                      </div>
                                </div>
                                </div>
                                {bets.length > 0 && (
                                  <div className="flex w-full items-center p-2">
                                      {/* <div>
                                          <FacebookShareButton className="items-center flex" title="Atteindre le groupe Franchise Players"
                                            url=""
                                            quote={"My quote"}
                                            hashtag={MakeHashTag()}
                                            >
                                              <FacebookIcon size={32} round onClick={() =>  navigator.clipboard.writeText(bets.join("|"))}/>
                                            </FacebookShareButton>
                                       </div> */}
                                      <IoMdCopy className=" hover:bg-[#00a2c7]/90   bg-orange-300 rounded text-orange-600" size={32} alt="Copy" 
                                        title="Copier dans le presse-papier" onClick={() => handleCopy()}></IoMdCopy>                             
                                      <a href="https://www.facebook.com/groups/680010455356375" target="_blank" title="Partager dans le groupe Franchise Players">
                                        <div className="flex">
                                          <MdOutlineShare className="rounded  hover:bg-[#00a2c7]/90  bg-orange-300 text-orange-600 ml-1"  size={32} ></MdOutlineShare>
                                          {/* <img className="w-8 border bg-orange-200 hover:bg-orange-400 rounded -mx-2" src="/images/logo-fp.png"/> */}
                                        </div>
                                      </a>
                                      <div className="flex-1 flex flex-row flex-wrap justify-end items-center gap-1 m-1">
                                            {bets.map((b, id) => ( 
                                                <div className="border rounded p-1 dark-green text-white"  key={id}> {b} </div>
                                            ))}   
                                      </div>         
                                  </div>   
                                )}    
                                <div className="text-xs text-white m-1 dark-green ">{
                                  bets.length > 0 
                                    ? <p className="animate-pulse">Partagez vos paris. Bonne chance! &#128512;</p> 
                                    : <p className="animate-pulse">Désolé, les paris sont fermés!&#129488;</p>}
                                </div>                  
                            </div> 
                            )}
                        </div>
                    </div>  
              </div>       
            </section>
            <section id="classement">
              <StandingComponent />
            </section>
            <div className="flex-row gradient-bg-welcome items-center text-xl font-bold text-white">
                <div className="grid grid-flow-col justify-center items-center">
                  {/* <img className="w-32" src="./images/logo-fp.png"/>
                  <span>Pré-Saison NBA {new Date().getFullYear()+1} </span> */}
                  <h1 className="flex-1 font-poppins font-semibold md:text-[72px] text-[50x] text-white ss:leading-[100.8px] leading-[75px]">
                  Saison {" "}
                      <span className="text-gradient">NBA {new Date().getFullYear()+1} </span>{" "}
                  </h1>
                </div>
            </div>
            <div className="grid grid-rows">
              <div className="flex flex-col items-center bg-blue-gradient rounded-b-lg p-2 text-white text-xs ">               
                    <a href="mailto:admin@franchise-players.com?subject=Depuis Franchise Players">
                      <div className="flex flex-row items-center hover:text-[#e5faff]">                 
                          <p>Nous écrire&nbsp;</p>
                          <MdOutlineAttachEmail />
                        </div>  
                    </a>                      
                  <p>
                    <a href="https://www.3jinformatics.com/" target="_blank" className="text-white visited:text-orange-500 hover:text-orange-800">3J Informatics, LLC.</a>
                  </p>
                  <p>&copy; Copyright {new Date().getFullYear()}, All rights reserved.</p>
                  <div className="flex flex-row md:mt-0 mt-1">
                    {socialMedia.map((social, index) => (
                      <img
                        key={social.id}
                        src={social.icon}
                        alt={social.id}
                        className={`w-[21px] h-[21px] object-contain cursor-pointer ${
                          index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
                        }`}
                        onClick={() => window.open(social.link)}
                      />
                  ))}
                </div>
              </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default App;