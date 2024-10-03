import mongoose from "mongoose"

const movieSchema = new mongoose.Schema({
    index: Number,
    budget: Number,
    genres: String,
    homepage: String,
    id: Number,
    keywords: String,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    production_companies: String,
    production_countries: String,
    release_date: Date,
    revenue: Number,
    runtime: Number,
    spoken_languages: String,
    status: String,
    tagline: String,
    title: String,
    vote_average: Number,
    vote_count: Number,
    cast: String,
    crew: String,
    director: String
  });

  export const Movie = mongoose.model("Movie", movieSchema)