import express from "express";

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(
    "api is up and been running, making changes consequently bit by bit"
  );
});

app.listen(port, () => console.log("Listening on port: ", port));
