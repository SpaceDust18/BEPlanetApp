import express from "express";
import { getAllItems, getItemById, createItem, updateItem, deleteItem } from "../db/queries/planets.js";

const router = express.Router();

// GET /api/planets
router.get("/", async (req, res, next) => {
    try {
        const planets = await getAllItems();
        res.json(planets);
    } catch (error) {
        next(error);
    }
});

// GET /api/planets/:id
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const planet = await getItemById(id);
        if (!planet) return res.status(404).send("Planet not found");
        res.json(planet);
    } catch (error) {
        next(error);
    }
});

// POST /api/planets
router.post("/", async (req, res, next) => {
    try {
        const { name, diameter_km, climate, has_life, distance_from_sun_au, discovered_by, discovery_date } = req.body;

        // Validates required fields
        if (!name || !diameter_km || !climate || has_life === undefined || !distance_from_sun_au ||
            !discovered_by || !discovery_date) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        // Data type validation
        if (
            typeof name !== "string" ||
            isNaN(Number(diameter_km)) ||
            typeof climate !== "string" ||
            typeof has_life !== "boolean" ||
            isNaN(Number(distance_from_sun_au)) ||
            typeof discovered_by !== "string" ||
            isNaN(Date.parse(discovery_date))
        ) {
            return res.status(400).json({ error: "Invalid data types." });
        }

        const newPlanet = await createItem({ name, diameter_km: Number(diameter_km), climate,  has_life, distance_from_sun_au: Number(distance_from_sun_au), discovered_by, discovery_date
        });

        res.status(201).json(newPlanet);
    } catch (error) {
        next(error);
    }
});

// PUT /api/planets/:id
router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, diameter_km, climate, has_life, distance_from_sun_au, discovered_by, discovery_date } = req.body;
             
        // Validates required fields
        if ( !name || !diameter_km || !climate || has_life === undefined || !distance_from_sun_au || !discovered_by || !discovery_date ) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        // Data type validation
        if (
            typeof name !== "string" ||
            isNaN(Number(diameter_km)) ||
            typeof climate !== "string" ||
            typeof has_life !== "boolean" ||
            isNaN(Number(distance_from_sun_au)) ||
            typeof discovered_by !== "string" ||
            isNaN(Date.parse(discovery_date))
        ) {
            return res.status(400).json({ error: "Invalid data types." });
        }

        const updatedPlanet = await updateItem(id, { name, diameter_km: Number(diameter_km), climate, has_life, distance_from_sun_au: Number(distance_from_sun_au), discovered_by, discovery_date });
            
        if (!updatedPlanet) return res.status(404).send("Planet not found");
        res.json(updatedPlanet);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/planets/:id
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedPlanet = await deleteItem(id);
        if (!deletedPlanet) return res.status(404).send("Planet not found");
        res.json({ message: "Planet deleted", planet: deletedPlanet });
    } catch (error) {
        next(error);
    }
});

export default router;
