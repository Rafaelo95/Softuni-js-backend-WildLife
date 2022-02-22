const mongoose = require("mongoose");

//TODO change dbName
const dbName = "wildlife";
const connectionString = `mongodb://localhost:27017/${dbName}`;

module.exports = async (app) => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected");

    mongoose.connection.on("error", (err) => {
      console.log(err);
    })
  } catch (err) {
    console.log("Error connectin to database");
    process.exit(1);
  }
};
