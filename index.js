import express from "express";
import mongoose from "mongoose";
import config from "./config/config.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

const mongoURL = `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_IP}:${config.MONGO_PORT}/?authSource=admin`;

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("successfully connected to DB"))
  .catch((e) => console.log(e));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("api is up and been running");
});

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.listen(port, () => console.log("Listening on port: ", port));
