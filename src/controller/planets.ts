import { Request, Response } from "express";
import Joi from "joi";
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

  const getAll = (req: Request, res: Response) =>{
    res.status(200).json(planets);
   }
  const getOneByID = (req: Request, res: Response) =>{
    const {id} = req.params;
     const planet = planets.find((p) => p.id === Number( id));
    res.status(200).json(planet);
   }

   const planetSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().min(5).required(),
   })

const create = (req: Request, res: Response) =>{
    const {id, name } = req.body
    const newPlanet: Planet = {id, name}
    const validateNewPlanet = planetSchema.validate(newPlanet)
    if(validateNewPlanet.error){
        return res.status(400).send(validateNewPlanet.error.message)
    }
    else{
        planets = [...planets, newPlanet]
    
        res.status(201).json({msg: "planet added"});
        }
   }

   const  updateById = (req: Request, res: Response)=>{
    const {id}= req.params;
    const {name} = req.body;
    planets = planets.map(p => p.id === Number(id) ? ({...p, name}): p)
  
    res.status(201).json({msg: "planet was updated"});
  }
   const deleteById = (req: Request, res: Response) => {
    const {id} =req.params;
   planets = planets.filter(p => p.id !== Number(id))
  }

  export { getAll, getOneByID, create, updateById, deleteById}