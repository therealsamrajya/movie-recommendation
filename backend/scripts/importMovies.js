import mongoose from "mongoose";
import dotenv from "dotenv";
import {parse} from "csv-parse"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Movie } from "../models/movies.model.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoUrl = "mongodb://samrajya:samrajya9840257965@cluster0-shard-00-00.ochgl.mongodb.net:27017,cluster0-shard-00-01.ochgl.mongodb.net:27017,cluster0-shard-00-02.ochgl.mongodb.net:27017/?ssl=true&replicaSet=atlas-6r75q1-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl)
  .then(() => console.log("MongoDB connection successful for import"))
  .catch((error) => console.log(error));

const parseCSV = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, "../data/movies.csv"))
      .pipe(parse({ columns: true }))
      .on("data", (data) => {
        const numericFields = ["index", "budget", "id", "popularity", "revenue", "runtime", "vote_average", "vote_count"];
        numericFields.forEach(field => {
          if (data[field]) {
            data[field] = parseFloat(data[field]);
          }
        });

        if (data.release_date) {
          data.release_date = new Date(data.release_date);
        }

        results.push(data);
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
        resolve(results);
      })
      .on("error", (error) => {
        console.error("Error parsing CSV:", error);
        reject(error);
      });
  });
};

const importMovies = async () => {
    try {
      await mongoose.connect(mongoUrl);
      console.log("MongoDB connection successful for import");
  
      const movies = await parseCSV();
      console.log(`Attempting to insert ${movies.length} movies`);
      await Movie.insertMany(movies);
      console.log("Movies imported successfully");
    } catch (error) {
      console.error("Error importing movies:", error);
    } finally {
      await mongoose.connection.close();
    }
  };

importMovies();