const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5005;
const connectDB = require('./src/db/connection');
const routes = require("./src/routes/notification.routes")

connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/notification" , routes);

app.get("/", (req, res) => {
    console.log("notification service is running");
    return res.json({message : "notification service is running"});
})

app.listen(PORT, () => {
    console.log(`Notification service is running at http://localhost:${PORT}/`)
})