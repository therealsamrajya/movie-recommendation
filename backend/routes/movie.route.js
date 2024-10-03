import express from "express";
import {Movie }from "../models/movies.model.js"

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { title, genre, year, limit = 10, page = 1 } = req.query;
    const query = {};

    if (title) query.title = new RegExp(title, "i");
    if (genre) query.genres = new RegExp(genre, "i");
    if (year) query.release_date = { $gte: new Date(`${year}-01-01`), $lt: new Date(`${parseInt(year)+1}-01-01`) };

    const movies = await Movie.find(query)
      .limit(parseInt(limit))
      .skip((page - 1) * limit)
      .sort({ popularity: -1 });

    const total = await Movie.countDocuments(query);

    res.json({
      movies,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;