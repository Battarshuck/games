import React from 'react';
import classes from "./gameCard.module.css";
const gameCard = (props) => {

  return (
    <div className={classes.card}>
      <div className={classes.cardImage}>
        <img src={props.image} alt={props.title} />
      </div>
      <div className={classes.cardContent}>
        <div className={classes.titleContainer}></div>
        <h2 className={classes.cardTitle}>{props.title}</h2>
        <div className={classes.cardBottom}>
          <p className={classes.cardAuthor}>By {props.author}</p>
          <div className={classes.cardButton}>
            <button className={classes.cardReadMore}>View More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default gameCard;