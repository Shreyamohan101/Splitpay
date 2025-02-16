const express = require('express');
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");  
require('dotenv').config();

const app = express();
app.use(express.json()); 

connectDB()
  .then(() => {
      console.log("Connected to MongoDB successfully");
      app.listen(4000, () => {
          console.log("Server is running on port 4000");
      });
  })
  .catch((err) => {
      console.error("Error occurred while connecting:", err);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); 

app.get("/", (req, res) => {
    res.send("SplitPay API is running...");
});
