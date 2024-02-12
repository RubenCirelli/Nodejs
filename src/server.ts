import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import "express-async-errors";

import { getAll, getOneByID, create, updateById, deleteById} from "./controller/planets"
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json())


 app.get("/api/planets", getAll)

 app.get("/api/planets/:id", getOneByID)

 app.post("/api/planets", create)

 app.put("/api/planets/:id", updateById)

app.delete('/api/planets/:id', deleteById);
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});