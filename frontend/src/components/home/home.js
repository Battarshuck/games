import React, { useState, useContext, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import classes from './home.module.css';
import MainContext from '../../context/mainContext.js';
import GameCard from '../gameCard/gameCard.js';
import { useQuery } from "@apollo/client";
import { GETGAMES } from "../../queries/getGames.js";

const Home = () => {
    const navigate = useNavigate();
    const {id, username, email} = useContext(MainContext);
    const [games, setGames] = useState([]);

    const { loading, error, data } = useQuery(GETGAMES,{
        variables: { getGamesId: id },
    });

    useEffect(() => {
        if(!id){
            navigate("/login");
        }
    }, [])
  
  return (
    <div className={classes.container}> 
        <div className={classes.homeTitleContainer}>
            <h1 className={classes.homeTitle}>Home</h1>
        </div>
        <div className={classes.userData}>
            <p className={classes.userDataName}>Welcome, {username}</p>
            <p className={classes.userDataEmail}>{email}</p>
        </div>
        <div className={classes.userGames}>
            <h1 className={classes.gamesSectionTitle}>Your Games</h1>
            <div className={classes.gamesContainer}>

                {
                    data && data.getGames.map((game) => {
                        return <GameCard 
                        image="https://www.gameinformer.com/sites/default/files/styles/full/public/2022/10/31/45a5fbbb/modern_warfare_ii.jpg"
                        title={game.name}
                        author={game.developer}/>
                    })
                }
                
            </div>
        </div>
    </div>
    
  );
}

export default Home;