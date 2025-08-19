import mysql from "mysql2/promise";

let db;

export const initDB = async () => {
  db = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,         
    password: process.env.PASSWORD, 
    database: process.env.DB
  });

  console.log("db connected.");

  await db.query(`
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL
    )
  `);
};

export const getDB = () => db;
