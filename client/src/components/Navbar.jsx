import { useState } from "react";
import { navLinks } from ".";
import styles from "../style"
import { MdFacebook} from "react-icons/md";
import {useExternalScript} from "../utils/useExternalScript";
import { facebookJSSDK } from "../utils/constants"

const Navbar = () => {
  const [active, setActive] = useState("Acceuil");
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState(null);
  
  const handleLogin = () => {
    //const fbLoginState = useExternalScript(facebookJSSDK);
    console.log(fbLoginState);
  }
  
  return (
    <nav className="w-full flex justify-between items-center">
      <div className="flex flex-row items-center ">
          <img className="w-48 my-2" src="./images/logo-franchiseplayers.png"/>
{/*           <p className="font-poppins font-semibold text-lg">
            <span className="text-[#e5faff]">Franchise{" "}</span>
            <span className="text-[#00a2c7]">Players</span>
          </p> */}
      </div>
      <ul className="list-none sm:flex hidden justify-start items-center flex-1 ml-20">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-[#ace1ee]" : "text-[#e5faff]"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
      <div className={`${styles.flexEnd}`}>
          <div className={`${styles.boxWidth}  text-white`}>
            { user? (
              <ul className="list-none sm:flex hidden justify-end items-center flex-1">
                <li>
                   <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
                   </fb:login-button>
                   <button className=" bg-[#e5faff] hover:bg-[#00a2c7] rounded-full">
                        <MdFacebook className="rounded" onClick={() => handleLogin()} 
                        color="blue" size={32} 
                        onContextMenu={(e) => {
                          e.preventDefault(); // prevent the default behaviour when right clicked
                          console.log("Right Click");
                        }}></MdFacebook>
                    </button>   
                </li>
              </ul>) : (
              <ul className="list-none sm:flex justify-end items-center flex-1">
               <li className="mx-2 text-xs text-white bg-blue-gradient">Tino Rossi</li>
                <li><img className="w-8 rounded-full border-2" src="./images/fp_120.png"/></li>
              </ul>
            )}
          </div>
        </div>
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? "././images/close.svg" : "././images/menu.svg"}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ?  "text-[#ace1ee]" : "text-[#e5faff]"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar