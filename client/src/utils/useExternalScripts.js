import { useEffect } from 'react';

//https://hackernoon.com/how-to-add-script-tags-in-react
export const useExternalScript = (url) => {
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");

    script.setAttribute("src", url);
    head.appendChild(script);

    return () => {
      head.removeChild(script);
    };
  }, [url]);
};