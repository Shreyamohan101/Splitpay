const express = require("express");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const billRoutes = require("./routes/billRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const { connectToWhatsApp, isWhatsAppConnected } = require("./services/whatsapp");
const routerlogger = require("express-list-endpoints");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
    res.send("SplitPay API is running...");
});


connectDB()
    .then(() => {
        console.log(" Connected to MongoDB successfully");

        app.listen(4000, () => {
            console.log(" Server is running on port 4000");
        });

        //  wtsp connection with Auto-retry
        async function connectWhatsAppWithRetry(retries = 3, delay = 5000) {
            for (let i = 0; i < retries; i++) {
                try {
                    await connectToWhatsApp();
                    console.log(" WhatsApp connected successfully!");
                    return;
                } catch (err) {
                    console.error(` WhatsApp connection failed (Attempt ${i + 1}/${retries})`, err);
                    if (i < retries - 1) {
                        console.log(` Retrying in ${delay / 1000} seconds...`);
                        await new Promise((res) => setTimeout(res, delay));
                    } else {
                        console.log(" WhatsApp connection failed after multiple attempts.");
                    }
                }
            }
        }

        //server start then start whstp connection
        connectWhatsAppWithRetry();
    })
    .catch((err) => {
        console.error(" Error occurred while connecting to MongoDB:", err);
    });

console.log(routerlogger(app));
