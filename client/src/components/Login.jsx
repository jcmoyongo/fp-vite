/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useForm } from "react-hook-form" //https://react-hook-form.com/get-started
import { useState } from "react";

export default function Login() {
  const [loggingIn, setLoggingIn] = useState(true)

  const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

  const onSubmit = (data) => {
		const userData = JSON.parse(localStorage.getItem(data.email));
		if (userData) { 
			if (userData.password === data.password) {
				console.log(userData.name + " You Are Successfully Logged In");
			} else {
				console.log("Email or Password is not matching with our record");
			}
		} else {
			console.log("Email or Password is not matching with our record");
		}
	};

  const handleRegister = (e) => {
    setLoggingIn(!loggingIn);
};
  
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            src="./images/fp-logo.png" width="32" height="32"
            alt="Franchise Players Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>

            {!loggingIn && 
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6  text-white">
                Name*
              </label>
              <div className="mt-2">
                <input 
                  id="email"
                  name="email"
                  type="email" {...register("name", { required: true })}
                  // required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                   placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
                {errors.name && <span style={{ color: "red" }}>Please enter your name.</span>}
              </div>
            </div>
          }
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email address*
              </label>
              <div className="mt-2">
                <input 
                  id="email"
                  name="email"
                  type="email" {...register("email", { required: true })}
                  autoComplete="email"
                  // required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                   placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
                {errors.email && <span style={{ color: "red" }}>Please enter a valid email.</span>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password*
                </label>
                {loggingIn &&
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
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
                 {errors.password && <span style={{ color: "red" }}>Please enter your password.</span>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loggingIn?"Sign in": "Register"}
              </button>
            </div>
          </form>

          {loggingIn?
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={handleRegister}>
                Register
              </a>
            </p>
            :
            <p className="mt-10 text-center text-sm text-gray-500">
              Already a user?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={handleRegister}>
                Sign in
              </a>
            </p>
          }
        </div>
      </div>
    </>
  )
  }
  