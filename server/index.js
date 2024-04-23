const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const imageRoute = require("./routes/image");
const userRoute = require("./routes/user");
const foodRoute = require("./routes/food");
const orderRoute = require("./routes/order");

const app = express();
dotenv.config();
const cors = require("cors");
const port = process.env.PORT || 8000;

// Configure CORS to allow requests from the frontend domain
app.use(cors({
  origin: `https://fruitara-frontend.vercel.app`,
  methods: ["GET", "POST"],
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json({ extended: true, limit: "3mb" }));

// Handle root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Connect to the database
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

// Start the server
app.listen(port, () => {
  connectDB();
  console.log("Server is running on port " + port);
});
