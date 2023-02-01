// const mysql = require('mysql2');
import mysql from "mysql2/promise";
// const mysql = require('mysql2/promise');

// create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'nodejsbasic'
// });
const pool = mysql.createPool({host:'localhost', user: 'root', database: 'nodejsbasic'});
// simple query


export default pool;