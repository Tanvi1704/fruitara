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
app.use(cors({
  origin: [`https://fruitara-frontend.vercel.app`],
  methods:  ["GET", "POST"],
  credentials : true,
}));
app.use(express.json({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// connect DB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("DB is Connected!");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("DB is Disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("DB is Connected!");
});

app.use("/api/v1/all", imageRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/food", foodRoute); 
app.use("/api/v1/order", orderRoute); 
app.use(express.json({ limit: "3mb" }));

app.listen(port, () => {
  connect();
  console.log("Listening on port " + port);
});
