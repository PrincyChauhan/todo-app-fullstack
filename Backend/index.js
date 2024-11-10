const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "https://todo-app-fullstack-indol.vercel.app/",
  })
);

app.use("/api/v1/task", require("./routes/TaskRoute"));
app.use("/api/v1/user", require("./routes/UserRoute"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
