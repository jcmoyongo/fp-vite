
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import {FaSquareFacebook} from "react-icons/fa6";
import { useState, useCallback, useEffect, useContext } from "react";
import { GameContext } from "../context/GameContext";
import TimerComponent from "./Timer";
import moment from "moment";
 
const ProfileComponent = () => {
    const {userProfile, setUserProfile} = useContext(GameContext);
    const [toggle, setToggle] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    const [profileImageSrc, setProfileImageSrc] = useState(null);
  
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");

        if (loggedInUser) {
            const userProfile = JSON.parse(loggedInUser);
            setUserProfile(userProfile);
        }
     
    }, []);

    const onLoginStart = useCallback(() => {
        //THIS CODE SEEMS REDUNDANT as useEffect() is also handling this!!!
        //alert('login start');
        setLoggingIn(true);
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser =  JSON.parse(loggedInUser);
            setUserProfile(foundUser);
            console.log("added user ", foundUser);
        }
        else {console.log("no user found");}
        console.log(userProfile);
    }, []);

    const onLogoutSuccess = useCallback(() => {

        setToggle(!toggle);
        setUserProfile();
        localStorage.clear();
        // console.log("onLogoutSuccess...");
        //alert('logout success');
        setLoggingIn(false);
    }, []);

    const onLogout = useCallback(() => {
        setToggle(false);
        setUserProfile();
        localStorage.clear();
        // console.log(`onLogout...${toggle}`);
    }, []);

    const handleLogin = () => {
        // console.log(`handleLogin... ${localStorage.getItem("user")}`);
        // console.log(`handleLogin... ${profile}`);
    }

    const onProfileClick = () => {
      setToggle(!toggle);
      setLoggingIn(false);
    //   console.log("`Clicked profile picture...Toggle:${toggle}`");
    }

    return (
        <div className="flex flex-wrap sm:justify-end mt-1 md:-mx-1 flex-col items-end">
            <div className="flex flex-1 justify-end items-center relative">
                <div className={`${!toggle ? "hidden" : "flex"} p-2 bg-black-gradient absolute top-8 -mx-20  my-2 min-w-[140px] rounded-xl sidebar`}>
                    <ul className="list-none flex justify-end items-start flex-1 flex-col text-[#e5faff]">
                        <li className="font-poppins font-medium cursor-pointer text-[16px]" >
                            <div className="flex flex-row items-center" onClick={onLogout}>
                                <FaSquareFacebook className="h-8 w-8" />
                                <h1 className="text-xs text-[#e5faff]">Se déconnecter</h1>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {!userProfile && (
                <LoginSocialFacebook className="sm:-mx-0 -mx-1"
                    appId="1202990393661179" 
                    onLoginStart={onLoginStart}
                    onLogoutSuccess={onLogoutSuccess} 
                    onResolve={(response) => {
                        setUserProfile(response.data);
                        localStorage.setItem("user", JSON.stringify(response.data));
                    }}
                    onReject={(error) => {
                        console.log(error);
                    }}
                    >                    

                    <FacebookLoginButton size="32px" className="justify-end" onClick={handleLogin} title="Se connecter pour pouvoir envoyer les paris par e-mail." >
                        {/* <BiLogIn></BiLogIn> */}
                        <div className="flex flex-row"   title="Se connecter pour pouvoir envoyer les paris par courriel.">
                            {loggingIn &&     <svg className="animate-spin h-3 w-3 mr-3 bg-[#e5faff]" viewBox="0 0 16 16"></svg>}                   
                            <h1 className="text-xs text-[#e5faff]">{!loggingIn?"Se connecter":"Connection en cours..."}</h1>
                        </div>
                    </FacebookLoginButton>
                </LoginSocialFacebook>
                ) 
            }             
            {userProfile && (
                <div className="flex items-center mb-1" onClick={onProfileClick}>
                    <div className="flex flex-col items-end">
                        <h1 className="text-xs text-[#e5faff]">{userProfile.name}</h1>
                        {/* <TimerComponent isLocal={true}/> */}
                    </div>

                    <img className="text-xs items-center ml-1 h-8 border-[#e5faff] text-white" alt="Profil"
                        src = {userProfile.picture.data.url}
                        onError={event => {
                            event.target.src = "./images/user-icon.png" //profileImageSrc
                            event.onerror = null
                      }}
                    />
                </div>
            )}

    </div>
    );
}

export default ProfileComponent;