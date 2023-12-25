import { useForm } from "react-hook-form" //https://react-hook-form.com/get-started
import { useState } from "react";


export default function Login() {
  const [loggingIn, setLoggingIn] = useState(true)
  const [error,setError]=useState();

  const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

  const signInAsync = async (formData) => {
    const endpoint = "http://localhost:3002/signin";

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(formData);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode: 'cors'
      };

      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();
      return data;

    } catch(error){
        console.log(error);
        setError(error)
    }
  }

  const registerAsync = async (formData) => {
    const endpoint = "http://localhost:3002/signup";

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({...formData, admin: false});

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode: 'cors'
      };

      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();
      return data;

    } catch(error){
      console.log(error);
      setError(error);
    }
  }

  const onSubmit = async (data) => {

    if (loggingIn) {
      const user = await signInAsync(data);
      console.log("Logged in with: ", user)
    }
    else {
      const user = await registerAsync(data);
      console.log("Registered: ", user)
    }
	};

  const handleRegister = (e) => {
    setLoggingIn(!loggingIn);
    e.preventDefault();
  };
  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            src="./images/fp-logo.png" width="32" height="32"
            alt="Franchise Players Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Connectez-vous à votre compte
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            {!loggingIn && 
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6  text-white">
                Nom*
              </label>
              <div className="mt-2">
                <input 
                  id="email"
                  name="email"
                  {...register("name", { required: true })}
                  // required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                   placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
                {errors.name && <span style={{ color: "red" }}>Veuillez saisir votre nom.</span>}
              </div>
            </div>
          }
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Nom d'utilisateur*
              </label>
              <div className="mt-2">
                <input 
                  id="email"
                  name="email"
                  type="email" {...register("email", { required: true })}
                  autoComplete="email"
                  // required
                  placeholder="jeandupont@fp.com"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                   placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
                {errors.email && <span style={{ color: "red" }}>Veuillez saisir un courriel valide. </span>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Mot de passe*
                </label>
                {loggingIn &&
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Vous avez oublié votre mot de passe?
                    </a>
                  </div>
                }
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password" {...register("password", { required: true })}
                  autoComplete="current-password"
                  // required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                   ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
                 {errors.password && <span style={{ color: "red" }}>Veuillez saisir votre mot de passe.</span>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loggingIn?"Connectez-vous": "Inscrivez-vous"}
              </button>
              {error && <Label>{error}</Label>}    
            </div>
          </form>

          {loggingIn?
            <p className="mt-10 text-center text-sm text-gray-500">
              Vous n'êtes pas membre?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={handleRegister}>
                Inscrivez-vous
              </a>
            </p>
            :
            <p className="mt-10 text-center text-sm text-gray-500">
              Vous êtes membre?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={handleRegister}>
                Connectez-vous
              </a>
            </p>
          }
        </div>
      </div>
    </>
  )
  }
  