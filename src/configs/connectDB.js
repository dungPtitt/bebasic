import mysql from "mysql2/promise";
require("dotenv").config();
const pool = mysql.createPool(
  {
    host: process.env.DB_HOST, 
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME
  }
  );
export default pool;
