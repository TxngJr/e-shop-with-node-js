const mongoose = require('mongoose');
const MONGODB = process.env.MONGODB_URI;

(async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGODB);
    console.log("Successfully connected to database");
  } catch (error) {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  }
})();
