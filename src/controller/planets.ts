import { Request, Response } from "express";
import Joi from "joi";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432");

const setupDb = async () => {
  await db.none(`
  DROP TABLE IF EXISTS  planets;

  CREATE TABLE planets(
    id SERIAL NOT NULL PRIMARY KEY, 
    name TEXT NOT NULL
  );
  `)
  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`)
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`)

  
}
setupDb()


  const getAll = async (req: Request, res: Response) =>{
    const planets =await  db.many(`SELECT * FROM planets ORDER BY id`);
    res.status(200).json(planets);
   }
  const getOneByID =async  (req: Request, res: Response) =>{
    const {id} = req.params;
    const planet =await  db.oneOrNone(`SELECT * FROM planets WHERE id=$1;`, Number(id));
    res.status(200).json(planet);
   }

   const planetSchema = Joi.object({
    name: Joi.string().min(5).required(),
   })

const create = async (req: Request, res: Response) =>{
    const { name } = req.body
    const newPlanet = { name}
    const validateNewPlanet = planetSchema.validate(newPlanet)
    if(validateNewPlanet.error){
        return res
        .status(400)
        .send(validateNewPlanet.error.message)
    }
    else{
        await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
    
        res.status(201).json({msg: "planet added"});
        }
   }

   const  updateById = async (req: Request, res: Response)=>{
    const {id}= req.params;
    const {name} = req.body;
    await db.none(`UPDATE planets SET name= $2 WHERE id=$1`, [Number(id),name ]);
    
  
    res.status(201).json({msg: "planet was updated"});
  }
   const deleteById = async (req: Request, res: Response) => {
    const {id} =req.params;
    await db.none(`DELETE FROM planets WHERE id= $1`,Number(id))

    res.status(200).json({msg: "The planet was deleted."});
  }

  export { getAll, getOneByID, create, updateById, deleteById}