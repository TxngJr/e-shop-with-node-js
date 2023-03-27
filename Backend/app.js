const express = require('express');
const cors = require('cors');
const app = express();
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);

module.exports = app;