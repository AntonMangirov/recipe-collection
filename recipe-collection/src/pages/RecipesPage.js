import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import styles from "../styles/RecipesPage.module.css";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

function RecipesPage() {
  const [currentRecipes, setCurrentRecipes] = useState([]);
  const [countRecipe, setCountRecipe] = useState([{ count: 1 }]);
  const [countRecipeAll, setCountRecipeAll] = useState([{ count: 1 }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    id: "null",
    list_num: 1,
    region: "null",
    type: "null",
    difficulty: "null",
  });

  const randomIndex = Math.floor(Math.random() * (countRecipeAll[0].count - 0));

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleDifficultyChange = (difficulty) => {
    setFilters((prevFilters) => ({ ...prevFilters, difficulty }));
  };

  const clearFilters = () => {
    setFilters({ region: "null", type: "null", difficulty: "null" });
  };

  const currentRecipesToShow = currentRecipes.slice(0, 6);

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
        setCurrentRecipes(JSON.parse(data));
      });
  }

  function getCountRecipe(
    id = null,
    list_num = 1,
    region = null,
    type = null,
    difficulty = null,
    time = null
  ) {
    fetch(
      "http://localhost:3001/countrecipe/" +
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
        setCountRecipe(JSON.parse(data));
      });
  }

  function getCountRecipeAll(
    id = null,
    list_num = null,
    region = null,
    type = null,
    difficulty = null,
    time = null
  ) {
    fetch(
      "http://localhost:3001/countrecipe/" +
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
        setCountRecipeAll(JSON.parse(data));
      });
  }

  useEffect(() => {
    let filter_difficulty =
      filters.difficulty !== "null" && filters.difficulty !== "Любая"
        ? filters.difficulty
        : "null";
    let filter_region =
      filters.region && filters.region !== "null" ? filters.region : "null";
    let filter_type =
      filters.type && filters.type !== "null" ? filters.type : "null";

    getRecipe(null, currentPage, filter_region, filter_type, filter_difficulty);
    getCountRecipe(null, null, filter_region, filter_type, filter_difficulty);
    getCountRecipeAll();
  }, [filters, currentPage]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        Сборник рецептов из разных стран мира
      </header>
      <div className={styles.mainContent}>
        <div className={styles.filterSection}>
          <div className={styles.filterInfo}>
            <img
              src="https://avatars.dzeninfra.ru/get-zen_doc/3985629/pub_5f3c700be6e80000745c31d9_5f3c71b3e9d89d0295c99d0e/scale_1200"
              alt="Eat"
              className={styles.filterImage}
            />
            <p>
              В нашей жизни, когда время становится все более ценным ресурсом,
              задача планирования приема пищи становится все более сложной.
            </p>
            <p>
              Часто мы сталкиваемся с дилеммой: что приготовить на завтрак, обед
              или ужин? Каким образом мы можем легко и быстро определиться с
              выбором блюда и не тратить много времени на принятие этого
              решения?
            </p>
            <p>Нашсервис поможет: выбирайте параметры - и вперед!</p>
          </div>

          <div className={styles.filterSetting}>
            <div className={styles.filterSettingItem}>
              <label className={styles.filterLable}>Кухня:</label>
              <select
                name="region"
                onChange={handleFilterChange}
                value={filters.region}
                className={styles.filterInput}
              >
                <option value="null">Все страны и регионы</option>
                <option value="Европейская кухня">Европейская кухня</option>
                <option value="Азиатская кухня">Азиатская кухня</option>
                <option value="Русская кухня">Русская кухня</option>
              </select>
            </div>
            <div className={styles.filterSettingItem}>
              <label className={styles.filterLable}>Тип блюда:</label>
              <select
                name="type"
                onChange={handleFilterChange}
                value={filters.type}
                className={styles.filterInput}
              >
                <option value="null">Все типы</option>
                <option value="Завтрак">Завтрак</option>
                <option value="Обед">Обед</option>
                <option value="Ужин">Ужин</option>
              </select>
            </div>
            <div className={styles.filterSettingItem}>
              <label className={styles.filterLable}>
                Сложность <br />
                приготовления:
              </label>
              <div>
                {["Любая", "Easy", "Medium", "Hard"].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => handleDifficultyChange(difficulty)}
                    className={
                      styles.button +
                      " " +
                      (filters.difficulty === difficulty
                        ? styles.activeButton
                        : "")
                    }
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={clearFilters} className={styles.clear}>
              Очистить фильтры
            </button>
            <div className={styles.rcipeRandom}>
              <p className={styles.randomInfo}>
                А еще можно попробовать на вкус удачу
              </p>
              <Link
                className={styles.randomButton}
                to={`/recipe/${randomIndex}`}
              >
                Мне повезёт!
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.recipesContainer}>
          <div className={styles.recipesHeader}>
            Найденные рецепты
            <span className={styles.recipeCount}>
              {countRecipe[0].count > 0 ? countRecipe[0].count : "Нет рецептов"}
            </span>
          </div>
          <div className={styles.recipesSection}>
            {currentRecipesToShow.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <Pagination
            recipesPerPage={6}
            totalRecipes={countRecipe[0].count}
            paginate={setCurrentPage}
            paginateCurrentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default RecipesPage;
