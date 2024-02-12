import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import "express-async-errors";

dotenv.config();

const app = express();

app.use(morgan("dev"));

let planets: { id: number; name: string }[] = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});