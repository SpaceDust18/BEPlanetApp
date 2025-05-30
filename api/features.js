import express from "express";
import { getAllItems, getItemById, createItem, updateItem, deleteItem } from "../db/queries/features.js";

const router = express.Router();

// GET /api/features
router.get("/", async (req, res, next) => {
  try {
    const features = await getAllItems();
    res.json(features);
  } catch (error) {
    next(error);
  }
});

// GET /api/features/:id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const feature = await getItemById(id);
    if (!feature) return res.status(404).send("Feature not found");
    res.json(feature);
  } catch (error) {
    next(error);
  }
});

// POST /api/features
router.post("/", async (req, res, next) => {
  try {
    const { planet_id, description } = req.body;

    // Validates required fields
    if (!planet_id || !description) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Data type validation
    if (isNaN(Number(planet_id)) || typeof description !== "string") {
      return res.status(400).json({ error: "Invalid data types." });
    }

    const newFeature = await createItem({
      planet_id: Number(planet_id),
      description
    });

    res.status(201).json(newFeature);
  } catch (error) {
    next(error);
  }
});

// PUT /api/features/:id
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { planet_id, description } = req.body;

    // Validates required fields
    if (!planet_id || !description) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Data type validation
    if (isNaN(Number(planet_id)) || typeof description !== "string") {
      return res.status(400).json({ error: "Invalid data types." });
    }

    const updatedFeature = await updateItem(id, {
      planet_id: Number(planet_id),
      description
    });

    if (!updatedFeature) return res.status(404).send("Feature not found");
    res.json(updatedFeature);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/features/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedFeature = await deleteItem(id);
    if (!deletedFeature) return res.status(404).send("Feature not found");
    res.json({ message: "Feature deleted", feature: deletedFeature });
  } catch (error) {
    next(error);
  }
});

export default router;
