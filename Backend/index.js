require('dotenv').config();
require('./config/database');
const app = require('./app');
const PORT = process.env.PORT;


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});