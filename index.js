import express from "express";
import mongoose from "mongoose";
import { createClient } from "redis";
import session from "express-session";
import connect_redis from "connect-redis";

import config from "./config/config.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

const mongoURL = `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_IP}:${config.MONGO_PORT}/?authSource=admin`;

let RedisStore = connect_redis(session);

// redis@v4
const redisClient = createClient({
  url: `redis://${config.REDIS_URL}:${config.REDIS_PORT}`,
  legacyMode: true,
});

redisClient.connect().catch(console.error);

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

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: config.SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUnitialized: false,
      httpOnly: true,
      maxAge: 60000,
    },
  })
);
app.use(express.json());

app.use("/api/v1/users", userRouter);

app.listen(port, () => console.log("Listening on port: ", port));
