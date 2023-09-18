import React, { useState, useContext } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Logo from '../logo/logo';
import localRoutes from '../../localRoutes/localRoutes';
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../queries/login";
import MainContext from '../../context/mainContext.js';

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const {setUsername, setEmail, setId} = useContext(MainContext);

  //Apollo mutation
  const [login, { error }] = useMutation(LOGIN);
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    

    // Construct the API endpoint and data to be sent
    const credentials = { email: email, password: password };
    try {
      const {data} = await login({ variables: credentials });
      console.log(data)
      if(data.login) {
        setUsername(data.login.name);
        setEmail(data.login.email);
        setId(data.login.id);
        setIsLogged(false);
        navigate("/home");
      }else{
        throw new Error("Wrong email or password");
      }
    } catch (error) {
      setIsLogged(true);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {<Logo/>}
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in to your account
                  </h1>
                  {isLogged && <p className="text-red-700">Wrong email or password</p>}
                  <form className="space-y-4 md:space-y-6" action="#">
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                          <input onChange= {e => setemail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email" required=""></input>
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input onChange= {e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></input>
                      </div>
                      {/* <div className="flex items-center justify-between">
                          <Link to="/forgetpassword" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>  
                      </div> */}
                      <button onClick={handleFormSubmit} type="submit" className="w-full text-black bg-slate-100 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Don’t have an account yet? <Link to={localRoutes.signUp} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>                       
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
  );
}

export default Login;