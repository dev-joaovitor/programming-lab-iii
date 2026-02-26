import express from "express";
import users from "./src/routes/users.js";

const app = express();
const DEFAULT_PORT = 3000;

app.use(express.json());
app.use(express.static("assets"));

app.get("/api/v1/health", function (req, res) {
  res.send("API WORKING");
});

app.use("/api/v1/users", users);

app.use(function (req, res) {
  res.send("NOT FOUND");
});

app.listen(DEFAULT_PORT, function () {
  console.log(`Server running on ${DEFAULT_PORT}`);
});
