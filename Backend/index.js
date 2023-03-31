require('dotenv').config();
require('./config/database');

const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");

const app = express();
const {PORT} = process.env;

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/user", userRoute);



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});