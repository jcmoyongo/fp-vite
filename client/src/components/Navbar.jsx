import { useState, useEffect, useCallback } from "react";
import { navLinks } from ".";

const Navbar = () => {
  const [active, setActive] = useState("Acceuil");
  const [toggle, setToggle] = useState(false);
  
  return (
    <nav className={`w-full flex items-center  border-t-2 border-[#00a2c7]`}>
      <div className="flex flex-row items-center ">
          <img className="w-48 my-2" src="./images/logo-franchiseplayers.png"/>
      </div>
      <ul className="list-none sm:flex hidden justify-end  flex-1 ml-20">
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
      {/* <fb:login-button scope="public_profile,email" onlogin={() => {checkLoginState();}} >
      </fb:login-button> */}
      {/* <div >
              <Profile/>
      </div> */}
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
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl z-10`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-xs ${
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

export default Navbar;