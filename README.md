# BEPlanetApp An app about planets facts/features. It contains three tables; planets, features and users. Assignment requirements:

Build a Backend Application
Unit 4
Overview
Choose a topic to create your back end application around. You can choose your own, or there are some examples below to help get you started

Design at least two tables that relate in some way (can use foreign keys, but joins and subqueries are not required)

Include basic validation in your database schema (ex: NOT NULL, UNIQUE)

Seed your database with at least 10 rows per table

Build an Express server with the following RESTful routes for each table in your database:

GET /[resource] – Get all

GET /[resource]/:id – Get one by ID

POST /[resource] – Create a new item

PUT /[resource]/:id – Update an item

DELETE /[resource]/:id – Delete an item

Handle errors in your API and respond with appropriate status codes (ex: send a 400 Bad Request if required fields are missing).

Include meaningful error messages in your responses so clients know what went wrong

Make sure you add in the appropriate middleware and error handling routes to your express server.

PART 2: 
Hash and compare passwords with bcrypt
Create and verify JSON web tokens to authenticate requests
Protect endpoints from unauthorized access
Route a request through multiple middleware functions
Reuse logic in shared middleware functions
