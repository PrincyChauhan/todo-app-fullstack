const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.use("/api/v1/task", require("./routes/TaskRoute"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
