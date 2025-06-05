DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS planets CASCADE;
DROP TABLE IF EXISTS users;

CREATE TABLE planets(
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL, 
  diameter_km INTEGER NOT NULL, 
  climate TEXT NOT NULL, 
  has_life BOOLEAN NOT NULL DEFAULT false, 
  distance_from_sun_au DECIMAL NOT NULL, 
  discovered_by TEXT NOT NULL, 
  discovery_date DATE NOT NULL, 
  created_at TIMESTAMP DEFAULT now()
);
CREATE TABLE features(
  id SERIAL PRIMARY KEY,
  planet_id INTEGER NOT NULL REFERENCES planets(id) ON DELETE CASCADE, 
  description TEXT NOT NULL
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY, 
  email TEXT UNIQUE NOT NULL, 
  password TEXT NOT NULL
);