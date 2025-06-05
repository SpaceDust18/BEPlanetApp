import db from "./client.js";

console.log("🌱 Seeding database...");

async function seed() {
  try {

    await db.query("DELETE FROM features;");
    await db.query("DELETE FROM planets;");

    const { rows: planets } = await db.query(`
      INSERT INTO planets (name, diameter_km, climate, has_life, distance_from_sun_au, discovered_by, discovery_date)
      VALUES 
        ('Aurora', 12700, 'temperate', true, 1.0, 'Dr. Starfield', '2025-05-29'),
        ('Zerion', 50000, 'icy', false, 30.5, 'Capt. Frost', '2001-12-01'),
        ('Voltara', 21000, 'hot', false, 0.4, 'Explorer X', '1999-07-12'),
        ('Nephra', 18000, 'toxic', false, 12.7, 'Vision AI', '2023-11-30'),
        ('Gaelia', 13400, 'temperate', true, 0.9, 'Team Terra', '2011-06-15')
      RETURNING id;
    `);

    const featureData = [
      { planet_id: planets[0].id, description: "Aurora has bioluminescent forests" },
      { planet_id: planets[1].id, description: "Zerion is covered in frozen methane lakes" },
      { planet_id: planets[2].id, description: "Voltara has active lava seas" },
      { planet_id: planets[3].id, description: "Nephra emits a purple toxic gas visible from orbit" },
      { planet_id: planets[4].id, description: "Gaelia has floating continents suspended in magnetic fields" }
    ];

    await Promise.all(
      featureData.map(({ planet_id, description }) =>
        db.query(
          "INSERT INTO features (planet_id, description) VALUES ($1, $2);",
          [planet_id, description]
        )
      )
    );

    console.log("Done seeding!");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await db.end();
  }
}

(async () => {
  await seed();
})();

