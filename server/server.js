import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from 'body-parser';
import router from "./routes/myRoutes.js";

const PORT = process.env.PORT || 5050;
const uri = process.env.ATLAS_URI;
const app = express();

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(uri).then(() => {
  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})

//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors()); // Enable All CORS Requests
app.use(express.json());
app.use("/api", router); // Route all API endpoints with /api to myRoutes router

app.get("/test", async (req, res) => {
  console.log("testing main")
  res.send("testing main here").status(200);
});