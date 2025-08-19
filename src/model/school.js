import { getDB } from "../config/db.js";

// Insert new school
export const addSchoolToDB = async (name, address, latitude, longitude) => {
  const db = getDB();
  await db.query(
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
    [name, address, latitude, longitude]
  );
};

// Fetch all schools
export const getAllSchools = async () => {
  const db = getDB();
  const [rows] = await db.query("SELECT * FROM schools");
  return rows;
};
