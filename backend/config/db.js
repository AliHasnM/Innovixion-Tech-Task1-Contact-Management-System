const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  console.log("MongoDB URI:", uri); // Debugging line

  return mongoose
    .connect(uri)
    .then(() => console.log(`connection to database established...`))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
