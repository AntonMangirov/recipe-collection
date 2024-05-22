import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "../styles/RecipeDetail.module.css";
import arrow from "../img/back.svg";
import stylesPagination from "../styles/Pagination.module.css";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setCurrentRecipes] = useState(null);
  const [imgIndex, setImgIndex] = useState(1);
  const pageNumbers = ["<", ">"];
  const getImagePath = (imgName) => {
    return imgName ? require(`../img/${imgName}.png`) : null;
  };

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
            <p className={styles.portions}>{recipe?.servings}</p>
          </div>
          <div className={styles.columItemLast}>
            <p className={styles.columLabel}>Описание</p>
            <p className={styles.columnDescription}>{recipe?.description}</p>
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
                <ul className={styles.columList}>
                  <li key={index}>
                    <span className={styles.listMarker}></span>
                    {instruction}
                    <div className={styles.verticalLine}></div>
                  </li>
                </ul>
              ))}
            </div>
          )}
        </div>
        <div className={styles.recipeImage}>
          <img
            src={getImagePath("pct_" + imgIndex)}
            alt={recipe.name}
            className={styles.image}
          />

          <nav>
            <ul className={stylesPagination.pagination}>
              {pageNumbers.map((number) =>
                number === "<" ? (
                  <li key={number} className={stylesPagination.pageItem}>
                    <a
                      onClick={() => setImgIndex(((imgIndex - 1 + 5) % 6) + 1)}
                      href="#!"
                      className={stylesPagination.pageLink}
                    >
                      {number}
                    </a>
                  </li>
                ) : (
                  <li key={number} className={stylesPagination.pageItem}>
                    <a
                      onClick={() =>
                        setImgIndex(Math.max(1, (imgIndex + 1) % 7))
                      }
                      href="#!"
                      className={stylesPagination.pageLink}
                    >
                      {number}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
