import { getDistance } from "geolib";
import { addSchoolToDB, getAllSchools } from "../model/school.js";

// Add school to database
export const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || latitude == null || longitude == null) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    await addSchoolToDB(name, address, latitude, longitude);
    res.status(201).json({ message: "School added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

// List schools sorted by proximity
export const listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude are required." });
  }

  try {
    const schools = await getAllSchools();

    const sortedSchools = schools
      .map((school) => ({
        ...school,
        distance: getDistance(
          { latitude: Number(latitude), longitude: Number(longitude) },
          { latitude: school.latitude, longitude: school.longitude }
        ) / 1000 
      }))
      .sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

