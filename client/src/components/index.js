export { default as GameComponent } from "./Game";
export { default as SelectComponent } from "./Select";
export { default as RadioButtonComponent } from "./RadioButton";
export { default as Navbar } from "./Navbar";
export { default as StandingComponent } from "./Standing";
export { default as ProfileComponent } from "./Profile";
export { default as Banner } from "./Banner";
export { default as TimerComponent} from "./Timer";
export {default as GeneralBannerComponent} from "./GeneralBanner";

import { facebook, instagram, linkedin, twitter  } from "../assets"

export const navLinks = [
    {
      id: "acceuil",
      title: "Acceuil",
    },
    {
        id: "classement",
        title: "Classement",
      },
    {
      id: "historique",
      title: "Historique",
    },
  ];

  
export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];