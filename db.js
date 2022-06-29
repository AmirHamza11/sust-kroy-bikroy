const { createPool } = require("mysql");
require("dotenv").config();

const pool = createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_USER_PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
});

module.exports = pool;
