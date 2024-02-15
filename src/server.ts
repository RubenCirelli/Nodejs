import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { getAll, getOneByID, create, updateById, deleteById, createImage} from "./controller/planets.js"
import multer from "multer";



const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, "./uploads")
  },
  filename: (req, file, cb) =>{
    cb(null, file.originalname)
  },
})
const upload = multer({storage})

dotenv.config();

const app = express();
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));

app.use(morgan("dev"));
app.use(express.json())


 app.get("/api/planets", getAll)

 app.get("/api/planets/:id", getOneByID)

 app.post("/api/planets", create)

 app.put("/api/planets/:id", updateById)

app.delete('/api/planets/:id', deleteById);

app.post("/api/planets/:id/image",upload.single( "image"),  createImage)
// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});