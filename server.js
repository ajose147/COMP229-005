// server/server.js
import mongoose from "mongoose";
import config from "./config/config.js";
import app from "./server/express.js";

mongoose.Promise = global.Promise;

mongoose
  .connect(config.mongoUri, {
    dbName: "Portfolio",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server running on port ${config.port}`);
});
