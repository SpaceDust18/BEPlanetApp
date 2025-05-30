import db from "../client.js";

// Gets all features
export async function getAllItems() {
  const result = await db.query("SELECT * FROM features;");
  return result.rows;
}

// Gets one feature by ID
export async function getItemById(id) {
  const result = await db.query("SELECT * FROM features WHERE id = $1;", [id]);
  return result.rows[0];
}

// Creates a new feature
export async function createItem(data) {
  const { planet_id, description } = data;

  const result = await db.query(
    `INSERT INTO features (planet_id, description)
     VALUES ($1, $2)
     RETURNING *;`,
    [planet_id, description]
  );

  return result.rows[0];
}

// Updates an existing feature
export async function updateItem(id, data) {
  const { planet_id, description } = data;

  const result = await db.query(
    `UPDATE features SET 
      planet_id = $1,
      description = $2
     WHERE id = $3
     RETURNING *;`,
    [planet_id, description, id]
  );

  return result.rows[0];
}

// Deletes a feature
export async function deleteItem(id) {
  const result = await db.query("DELETE FROM features WHERE id = $1 RETURNING *;", [id]);
  return result.rows[0];
}
