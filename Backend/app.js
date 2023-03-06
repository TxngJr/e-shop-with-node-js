const express = require('express');
const cors = require('cors');
const app = express();
const userRoute = require("./routes/userRoute");

app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);

module.exports = app;