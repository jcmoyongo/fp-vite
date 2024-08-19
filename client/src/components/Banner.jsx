import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react';

const BannerComponent = ({message}) =>{
  const [dateLocale, setDateLocale] = useState();
  const [heureLocale, setHeureLocale] = useState(); 
  const [dateFuture, setDateFuture] = useState(new Date().toLocaleDateString('fr-FR', { timeZone: 'America/New_York' }));
  
   // Convertir le temps total en secondes
  let temps = message.slice(0, -1);
  // console.log(temps);
  // Séparer les jours, heures, minutes et secondes
  let [jours, reste] = temps.split(".");
  jours = reste === undefined? 0:jours;
  // console.log(`Jours ${jours} reste ${reste}`);
  let [heures, minutes, secondes] = reste === undefined? temps.split(":"): reste.split(":");//Fix this
  // console.log(heures, minutes, secondes);

  // console.log(message, jours, heures, minutes, secondes);
  let nouvelleDate = new Date();
  nouvelleDate.setDate(nouvelleDate.getDate() + parseInt(jours));
  nouvelleDate.setHours(nouvelleDate.getHours() + parseInt(heures));
  nouvelleDate.setMinutes(nouvelleDate.getMinutes() +  parseInt(minutes));
  nouvelleDate.setSeconds(nouvelleDate.getSeconds() + parseInt(secondes));
   
  useEffect(() => {
    const intervalId = setInterval(() => {
      secondes = secondes == 0? 59 : secondes - 1;
      minutes = secondes == 59? minutes - 1 : minutes;
      heures = minutes == 59? heures - 1 : heures;
      jours = heures == 0? jours > 0? jours - 1 : 0: jours;

      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setDateFuture(nouvelleDate.toLocaleDateString('fr-FR', { timeZone: timeZone }));//Take this outside...
      
      // Mettre à jour l'état
      setDateLocale(`${jours} jour(s)`);
      setHeureLocale(`${parseInt(heures)} heure(s), ${minutes} minute(s) et ${secondes} seconde(s)`);

    }, 1000);

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div className="text-sm leading-6 text-red-900 text-justify">
        <div>
          <strong className="font-semibold">Attention</strong>
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
          Hors quota de volume d'appels. {dateFuture && dateLocale && heureLocale &&
          <p>Le quota sera renouvelé le {dateFuture}, dans {dateLocale}, {heureLocale}. En attendant, le calendrier des matchs et le classement des équipes seront statiques.</p>
          }
        </div>
      </div>
      <div className="flex flex-1 ">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          <span className="sr-only">Dismiss</span>
          {/* <XMarkIcon className="h-5 w-5 text-gray-900" aria-hidden="true" /> */}
          <ExclamationTriangleIcon className="h-5 w-5  text-red-900" />
        </button>
      </div>
    </div>
  )
}

export default BannerComponent;