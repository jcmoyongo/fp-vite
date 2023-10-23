
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import {BiLogIn, BiLogOut} from "react-icons/bi";
import {FaSquareFacebook} from "react-icons/fa6";
import { useState, useCallback, useEffect } from "react";
 
const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
  
    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      //console.log(`Entering useEffect ${loggedInUser}`);
    //   if (loggedInUser) {
    //     console.log(`Entered useEffect ${profile}`);
    //     const foundUser =  JSON.parse(loggedInUser);
    //     setProfile(foundUser);
    //     console.log(`Set profile ${profile}`);
    //   }
    }, []);

    const onLoginStart = useCallback(() => {
        // console.log(`onLoginStart... ${profile}`);
        //alert('login start');
        setLoggingIn(true);
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            // console.log("Setting Profile...");
            const foundUser =  JSON.parse(loggedInUser);
            setProfile(foundUser);
        }
    }, []);

    const onLogoutSuccess = useCallback(() => {

        setToggle(!toggle);
        setProfile();
        localStorage.clear();
        // console.log("onLogoutSuccess...");
        //alert('logout success');
        setLoggingIn(false);
    }, []);

    const onLogout = useCallback(() => {
        setToggle(false);
        setProfile();
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
        <div className="flex flex-wrap sm:justify-end mt-1 md:-mx-1">
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
            {!profile && (
                <LoginSocialFacebook className="sm:-mx-0 -mx-1"
                    appId="1202990393661179" 
                    onLoginStart={onLoginStart}
                    onLogoutSuccess={onLogoutSuccess} 
                    onResolve={(response) => {
                        setProfile(response.data);
                        localStorage.setItem("user", JSON.stringify(response.data));
                    }}
                    onReject={(error) => {
                        console.log(error);
                    }}
                    >                    

                    <FacebookLoginButton size="32px" className="justify-end" onClick={handleLogin} title="Se connecter pour pouvoir envoyer les paris par e-mail." >
                        {/* <BiLogIn></BiLogIn> */}
                        <div className="flex flex-row">
                            {loggingIn &&     <svg class="animate-spin h-3 w-3 mr-3 bg-[#e5faff]" viewBox="0 0 16 16"></svg>}                   
                            <h1 className="text-xs text-[#e5faff]">{!loggingIn?"Se connecter":"Connection en cours..."}</h1>
                        </div>
                    </FacebookLoginButton>
                </LoginSocialFacebook>
                ) 
            }             
            {profile && (
                <div className="flex items-center mb-1" onClick={onProfileClick}>
                    <h1 className="text-xs text-[#e5faff]">{profile.name}</h1>
                    <img className="ml-1 rounded-full border-2 h-8 border-[#e5faff]" src={profile.picture.data.url} />
                </div>
            )}

    </div>
    );
}

export default Profile;