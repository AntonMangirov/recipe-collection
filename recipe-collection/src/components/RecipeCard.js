import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/RecipeCard.module.css";
import time from "../img/time.svg";
import emptyStar from "../img/empty_star.svg";
import fullStar from "../img/full_star.svg";

function RecipeCard({ recipe }) {
  const getImagePath = (imgName) => {
    return imgName ? require(`../img/${imgName}.png`) : null;
  };

  const imgPath = getImagePath(recipe.img);

  const renderStars = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return [fullStar, emptyStar, emptyStar];
      case "Medium":
        return [fullStar, fullStar, emptyStar];
      case "Hard":
        return [fullStar, fullStar, fullStar];
      default:
        return [];
    }
  };

  const stars = renderStars(recipe.difficulty);

  return (
    <div className={styles.card}>
      <Link to={`/recipe/${recipe.id}`} className={styles.link}>
        <div className={styles.cardPresentation}>
          <div className={styles.cardHeader}>
            <h3>{recipe.name}</h3>
          </div>
          <img src={imgPath} alt={recipe.name} className={styles.cardImage} />
        </div>
        <div className={styles.cardInfo}>
          <p>{recipe.description}</p>
          <div className={styles.timeBox}>
            <img src={time} alt="Длительность :"></img>
            <span> {recipe.time} минут</span>
          </div>
          <div>
            <p>
              Сложность:
              {stars.map((star, index) => (
                <img key={index} src={star} alt={`Star ${index + 1}`} />
              ))}
            </p>
          </div>
          <p>{recipe.region}</p>
          <p>{recipe.type}</p>
        </div>
      </Link>
    </div>
  );
}

export default RecipeCard;
