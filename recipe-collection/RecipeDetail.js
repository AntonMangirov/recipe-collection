import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
//import recipes from '../data/recipes'
import styles from "../styles/RecipeDetail.module.css";
import arrow from "../img/back.svg";
import pct_1 from "../img/pct_1.png";
import pct_2 from "../img/pct_2.png";
import pct_3 from "../img/pct_3.png";
import pct_4 from "../img/pct_4.png";
import pct_5 from "../img/pct_5.png";
import pct_6 from "../img/pct_6.png";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setCurrentRecipes] = useState(null);

  function getRecipe(
    id = null,
    list_num = 1,
    region = null,
    type = null,
    difficulty = null,
    time = null
  ) {
    fetch(
      "http://localhost:3001/" +
        "id=" +
        id +
        "&list_num=" +
        list_num +
        "&region=" +
        region +
        "&type=" +
        type +
        "&difficulty=" +
        difficulty +
        "&time=" +
        time
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setCurrentRecipes(JSON.parse(data)[0]);
      });
  }

  useEffect(() => {
    getRecipe(id);
  }, [id]);

  if (!recipe) {
    return (
      <>
        <Link to={"/"} className={styles.link}>
          <img src={arrow} alt="назад"></img>
        </Link>
        <p>Recipe not found!</p>
      </>
    );
  }

  const tagsRecipe =
    recipe?.tags.length > 0 ? "#" + recipe.tags.join(" #") : "";

  const getImagePath = (imgName) => {
    switch (imgName) {
      case "pct_1":
        return pct_1;
      case "pct_2":
        return pct_2;
      case "pct_3":
        return pct_3;
      case "pct_4":
        return pct_4;
      case "pct_5":
        return pct_5;
      case "pct_6":
        return pct_6;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to={"/"} className={styles.linkBack}>
          <img src={arrow} alt="назад" />
        </Link>
        <h1>{recipe.name}</h1>
      </div>
      <div className={styles.body}>
        <div className={styles.leftColumn}>
          <div className={styles.columInfo}>
            <p className={styles.columLabel}>Кухня</p>
            <p className={styles.columResult}>{recipe?.region}</p>
          </div>
          <div className={styles.columInfo}>
            <p className={styles.columLabel}>Теги</p>
            <p className={styles.columTags}>{tagsRecipe}</p>
          </div>
          <div className={styles.columCalorie}>
            <p className={styles.columLabel}>Калорийность</p>
            <div className={styles.calorieResult}>
              <span>{recipe?.calories} ккал</span>
              <span className={styles.calorieGram}>100 грамм</span>
            </div>
          </div>
          <div className={styles.columInfo}>
            <p className={styles.columLabel}>Количество порций</p>
            <span>{recipe?.servings}</span>
          </div>
          <div className={styles.columItemLast}>
            <p className={styles.columLabel}>Описание</p>
            <p>{recipe?.description}</p>
          </div>
        </div>
        <div className={styles.middleColumn}>
          <div className={styles.columInfo}>
            <p className={styles.columLabel}>Общее время приготовления</p>
            <p className={styles.columResult}>{recipe?.time} минут</p>
          </div>
          {recipe?.instructions?.length > 0 && (
            <div className={styles.columItemLast}>
              <p className={styles.columLabel}>Инструкции по приготовлению:</p>
              {recipe?.instructions?.map((instruction, index) => (
                <ul>
                  <li key={index}>{instruction}</li>
                </ul>
              ))}
            </div>
          )}
        </div>
        <div className={styles.recipeImage}>
          <img
            src={getImagePath(recipe.img)}
            alt={recipe.name}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
