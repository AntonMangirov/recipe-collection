const Pool = require("pg").Pool;
const pool = new Pool({
  user: "my_user",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
});

const getRecipe = (id, list_num, region, type, difficulty, time) => {
  return new Promise(function (resolve, reject) {
    let id_if = id != "null" ? " AND ID = " + id : " ";
    let region_if = region != "null" ? " AND region = '" + region + "'" : " ";
    let type_if = type != "null" ? " AND type = '" + type + "'" : " ";
    let difficulty_if =
      difficulty != "null" ? " AND difficulty = '" + difficulty + "'" : " ";
    let time_if = time != "null" ? " AND time = " + time : " ";
    let list_num_if =
      list_num != "null" ? " LIMIT 6 OFFSET " + (list_num - 1) * 6 : " ";

    pool.query(
      "SELECT * FROM recipe_table " +
        "WHERE ID > 0 " +
        id_if +
        region_if +
        type_if +
        difficulty_if +
        time_if +
        " ORDER BY ID" +
        list_num_if +
        ";",
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const getCountRecipe = (id, list_num, region, type, difficulty, time) => {
  return new Promise(function (resolve, reject) {
    let id_if = id != "null" ? " AND ID = " + id : " ";
    let region_if = region != "null" ? " AND region = '" + region + "'" : " ";
    let type_if = type != "null" ? " AND type = '" + type + "'" : " ";
    let difficulty_if =
      difficulty != "null" ? " AND difficulty = '" + difficulty + "'" : " ";
    let time_if = time != "null" ? " AND time = " + time : " ";
    let list_num_if =
      list_num != "null" ? " LIMIT 6 OFFSET " + (list_num - 1) * 6 : " ";

    pool.query(
      "SELECT count(*) FROM recipe_table " +
        "WHERE ID > 0 " +
        region_if +
        type_if +
        difficulty_if +
        time_if +
        ";",
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const getRegionRecipe = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "select distinct region from recipe_table;",
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const getTypeRecipe = () => {
  return new Promise(function (resolve, reject) {
    pool.query("select distinct type from recipe_table;", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getDifficultyRecipe = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "select distinct difficulty from recipe_table;",
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

module.exports = {
  getRecipe,
  getCountRecipe,
  getRegionRecipe,
  getTypeRecipe,
  getDifficultyRecipe,
};
