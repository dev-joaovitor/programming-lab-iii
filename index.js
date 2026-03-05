import express from "express";
import userRoutes from "./src/routes/user.routes.js";

const DEFAULT_PORT = 3000;

const app = express();
const router = app.router;

app.use(express.json());

// in case we use static html
// app.use(express.static("assets"));

router.get("/health", function (req, res) {
  res.send("API WORKING");
});

// prefix
app.use("/api/v1", router);
router.use("/users", userRoutes);

// 404
app.use(function (req, res) {
  res.send("NOT FOUND");
});

// run
app.listen(DEFAULT_PORT, function () {
  console.log(`Server running on ${DEFAULT_PORT}`);
});

