const express = require('express');
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); 
const billRoutes = require("./routes/billRoutes"); 
const routerlogger = require("express-list-endpoints");
const protect = require('./middlewares/authMiddleware.js');
const expenseRoutes = require("./routes/expenseRoutes");


require('dotenv').config();

const app = express();
app.use(express.json()); 

app.use("/api/auth", authRoutes);
app.use("/api/users", protect, userRoutes); 
app.use("/api/bills", protect, billRoutes); 
app.use("/api/expenses", expenseRoutes); 
app.get("/", (req, res) => {
    res.send("SplitPay API is running...");
});

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

  console.log(routerlogger(app));
