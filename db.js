const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "ghumabo11",
  database: "sust_kroy_bikroy",
  connectionLimit: 10,
});

module.exports = pool;
