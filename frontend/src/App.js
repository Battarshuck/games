import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useState, useContext } from 'react';
import './App.css';
import Login from './components/login/login'
import Signup from './components/signup/signup'
import Home from './components/home/home'
import localRoutes from './localRoutes/localRoutes'
import { ApolloProvider } from '@apollo/client';
import client from './requests/apollo.js';
import MainContext from './context/mainContext.js';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState(''); 

  return (
    <ApolloProvider client={client}>
      <MainContext.Provider value={{username, setUsername, email, setEmail, id, setId}}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route path={localRoutes.logIn} element={<Login/>} />
            <Route path={localRoutes.signUp} element={<Signup/>} />
            <Route path={localRoutes.home} element={<Home/>} />
            {/* <Route path="*" element={<NotFound/>} /> */}
          </Routes>
        </Router>
      </MainContext.Provider>
    </ApolloProvider>
  );
}

export default App;
