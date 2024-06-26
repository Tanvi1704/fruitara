const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const imageRoute = require("./routes/image");
const userRoute = require("./routes/user");
const foodRoute = require("./routes/food");
const orderRoute = require("./routes/order");

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Enable CORS for requests from the frontend domain
app.use(cors({
  origin: "https://fruitara-frontend.vercel.app",
  methods: ["GET", "POST", "PUT"],
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json({ limit: "3mb" }));

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Connect to MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("DB is Connected!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

// Event handlers for database connection
mongoose.connection.on("disconnected", () => {
  console.log("DB is Disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("DB is Connected!");
});

// Define routes
app.use("/api/v1/all", imageRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/food", foodRoute);
app.use("/api/v1/order", orderRoute);

// Add middleware to include CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://fruitara-frontend.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "PUT");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Start the server after connecting to the database
connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
});
