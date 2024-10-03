import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv" 
import movieRoutes from "./routes/movie.route.js"


dotenv.config();
const app =express()
const port = process.env.PORT;
const mongoUrl = "mongodb://samrajya:samrajya9840257965@cluster0-shard-00-00.ochgl.mongodb.net:27017,cluster0-shard-00-01.ochgl.mongodb.net:27017,cluster0-shard-00-02.ochgl.mongodb.net:27017/?ssl=true&replicaSet=atlas-6r75q1-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl).then(()=>{console.log("MongoDB connection successfull");
}).catch((error)=>{console.log(error);})

app.use(express.json());
app.use("/api/movies", movieRoutes);


app.get("/",(req,res)=>{

    res.send("Express App is running")
})

app.listen(port,()=>console.log(`server is running on port ${port}`))