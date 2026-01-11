require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());


connectDB();


app.use("/api/moods", require("./routes/mood_routes"));


app.get("/", (req, res) => {
  res.send("Mood Music API Running");
});


const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
