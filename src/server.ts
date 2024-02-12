import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import "express-async-errors";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json())
type Planet ={
  id: number,
  name: string;
}
type planets = Planet[];

let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

 app.get("/api/planets", (req, res) =>{
  res.status(200).json(planets);
 })

 app.get("/api/planets/:id", (req, res) =>{
  const {id} = req.params;
   const planet = planets.find((p) => p.id === Number( id));
  res.status(200).json(planet);
 })

 app.post("/api/planets", (req, res) =>{
  const {id, name } = req.body
  const newPlanet = {id, name}
  planets = [...planets, newPlanet]

  res.status(201).json({msg: "planet added"});
 })

 app.put("/api/planets/:id", (req,res)=>{
  const {id}= req.params;
  const {name} = req.body;
  planets = planets.map(p => p.id === Number(id) ? ({...p, name}): p)

  res.status(201).json({msg: "planet was updated"});
})
app.delete('/api/planets/:id', (req, res) => {
  const {id} =req.params;
 planets = planets.filter(p => p.id !== Number(id))
});
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});