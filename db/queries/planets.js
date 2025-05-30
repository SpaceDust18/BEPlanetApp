import db from "../client.js";

// Gets all planets
export async function getAllItems() {
  const result = await db.query("SELECT * FROM planets;");
  return result.rows;
}

// Gets one planet by ID
export async function getItemById(id) {
  const result = await db.query("SELECT * FROM planets WHERE id = $1;", [id]);
  return result.rows[0];
}

// Creates a new planet
export async function createItem(data) { 
  const { name, diameter_km, climate, has_life, distance_from_sun_au, discovered_by, discovery_date
    } = data;
    
  const result = await db.query(
    `INSERT INTO planets (name, diameter_km, climate, has_life, distance_from_sun_au, discovered_by, discovery_date)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *;`,
    [name, diameter_km, climate, has_life, distance_from_sun_au, discovered_by, discovery_date]
  );

  return result.rows[0];
}

// Update an existing planet
export async function updateItem(id, data) {
    const { name, diameter_km, climate, has_life, distance_from_sun_au, discovered_by, discovery_date
    } = data;

  const result = await db.query(
    `UPDATE planets SET 
      name = $1,
      diameter_km = $2,
      climate = $3,
      has_life = $4,
      distance_from_sun_au = $5,
      discovered_by = $6,
      discovery_date = $7
     WHERE id = $8
     RETURNING *;`,
    [name, diameter_km, climate, has_life, distance_from_sun_au, discovered_by, discovery_date, id]
  );

  return result.rows[0];
}

// Deletes a planet
export async function deleteItem(id) {
  const result = await db.query("DELETE FROM planets WHERE id = $1 RETURNING *;", [id]);
  return result.rows[0];
}
