import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { studentModel } from './schemas/model.js';
  dotenv.config();
const router = express.Router();
router.use(express.json());
async function main() {
    try {
         await mongoose.connect(process.env.DB_URL);
        console.log("Connected to database successfully");
    } catch (error) {
        console.error("Failed to connect to database", error);
    }
}

main();
router.get("/",async(req,res)=>{
    const allStudents = await studentModel.find({});
    res.json(allStudents);
});

router.post("/",async(req,res)=>{
    const {body} = req;
    if(body.name && body.age){
        try{
            const studentInput = new studentModel({
                name:body.name,
                age:body.age,
            })
            await studentInput.save();
            res.sendStatus(200);
        }catch(error){
            res.sendStatus(404);
        }
    }
})
router.get("/:id",async(req,res)=>{
    const id = req.params.id;
    const getElementWithId = await studentModel.findById(id);
    try{
        if(getElementWithId){
            res.status(200).json(getElementWithId);
        }
        else{
            res.status(404).send("ELEMENT NOT FOUND");
        }
    }
    catch(error){
        res.status(500).send("INTERNAL SERVER ERROR");
    }
})
router.delete("/:id",async(req,res)=>{
    const id = req.params.id;
    const deleteElement = await studentModel.deleteOne({_id: id});
    try{
        if(deleteElement.deletedCount > 0){
            res.status(200).json(await studentModel.find({}));
        }
        else{
            res.status(404).send("ELEMENT NOT FOUND");
        }
    }catch(error){
        res.status(500).send("INTERNAL SERVER ERROR");
    }
})



export default router;