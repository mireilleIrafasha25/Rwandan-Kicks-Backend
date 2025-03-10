
import express from "express";
import mongoose from "mongoose";
import router from "./route/index.js";
import errorHandler from "./middleware/errorhandler.js";
import dotenv from "dotenv";
import fs from "fs/promises";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

dotenv.config();

const corsOptions = {
  allowedHeaders: ["Authorization", "Content-Type"],
  methods: ["GET", "POST", "PUT", "UPDATE", "DELETE"],
  origin: "*",
};

// Load Swagger JSON asynchronously
async function loadDocumentation() {
  try {
    const data = await fs.readFile(new URL("./doc/swagger.json", import.meta.url), "utf-8");
    // console.log("Swagger file loaded successfully!"); // Debugging log
    return JSON.parse(data);
  } catch (error) {
    // console.error("Error loading Swagger JSON:", error);
    return null; // Prevents app crash
  }
}


const app = express();

app.use(cors(corsOptions)); // Ensure CORS is configured properly
app.use(express.json()); // Ensure JSON parsing is enabled


// Use an async function to start the server
async function startServer() {
  try {
    const documentation = await loadDocumentation();
if (documentation) {
  app.use("/api_docs", swaggerUi.serve, swaggerUi.setup(documentation));
} else {
  console.error("Swagger documentation could not be loaded.");
}


    await mongoose.connect(`${process.env.db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds timeout
      maxPoolSize: 10, // Maintain up to 10 socket connections
    });
       // Increase timeout to 2 minutes
app.use((req, res, next) => {
  req.setTimeout(120000); // 120 seconds
  next();
});
    console.log("Connected to DB");

    app.use("/SpotSure", router);
    

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
app.use(errorHandler);