import express from "express";
import users from "./src/routes/users.js";

const app = express();
const router = app.router;
const DEFAULT_PORT = 3000;

app.use(express.json());
app.use(express.static("assets"));

router.get("/health", function (req, res) {
  res.send("API WORKING");
});

router.use("/users", users);

// prefix
app.use("/api/v1", router);

// 404
app.use(function (req, res) {
  res.send("NOT FOUND");
});

app.listen(DEFAULT_PORT, function () {
  console.log(`Server running on ${DEFAULT_PORT}`);
});
