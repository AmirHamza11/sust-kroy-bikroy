const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "ghumabo11",
  database: "test",
  connectionLimit: 10,
});

module.exports = pool;
