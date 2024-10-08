
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import {BiLogIn, BiLogOut} from "react-icons/bi";
import {FaSquareFacebook} from "react-icons/fa6";
import {CgProfile} from "react-icons/cg";
import { useState, useCallback, useEffect } from "react";
 
const FBProfile = () => {
    const [FBProfile, setProfile] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
  
    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
    }, []);

    const onLoginStart = useCallback(() => {
        // console.log(`onLoginStart... ${FBProfile}`);
        //alert('login start');
        setLoggingIn(true);
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            // console.log("Setting FBProfile...");
            const foundUser =  JSON.parse(loggedInUser);
            setProfile(foundUser);
        }
        console.log(FBProfile);
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
        // console.log(`handleLogin... ${FBProfile}`);
    }

    const onProfileClick = () => {
      setToggle(!toggle);
      setLoggingIn(false);
    //   console.log("`Clicked FBProfile picture...Toggle:${toggle}`");
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
            {!FBProfile && (
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
                            {loggingIn &&     <svg className="animate-spin h-3 w-3 mr-3 bg-[#e5faff]" viewBox="0 0 16 16"></svg>}                   
                            <h1 className="text-xs text-[#e5faff]">{!loggingIn?"Se connecter":"Connection en cours..."}</h1>
                        </div>
                    </FacebookLoginButton>
                </LoginSocialFacebook>
                ) 
            }             
            {FBProfile && (
                <div className="flex items-center mb-1" onClick={onProfileClick}>
                    <h1 className="text-xs text-[#e5faff]">{FBProfile.name}</h1>
                    <img className="ml-1 rounded-full border-2 h-8 border-[#e5faff] text-white" alt="Photo" src={FBProfile.picture.data.url} />
                </div>
            )}

    </div>
    );
}

export default FBProfile;