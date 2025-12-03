import plantModel from "../models/plantModel.js";
import fs from 'fs';

//add plant item
const addPlant = async (req,res) =>{
    
    let image_filename = `${req.file.filename}`;
    const plant = new plantModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    });
    
    try {
        await plant.save();
        res.json({success:true,message:"New Plant Added"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something went wrong"});
    }
};

//all plant list
const listPlant = async (req,res)=>{
    try {
        const plants = await plantModel.find({});
        res.json({success:true,data:plants});
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"});
    }
}

//remove plant item
const removePlant = async (req,res)=>{
    try {
        const plant = await plantModel.findById(req.body.id);
        fs.unlink(`uploads/${plant.image}`,()=>{})
        
        await plantModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Plant Remove"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error while removing"});
    }
}

//to update
// const updatePlant = async (req, res) => {
//     try {
//         const { _id, name, description, price, category } = req.body;
//         await plantModel.findByIdAndUpdate(_id, {
//             name,
//             description,
//             price,
//             category
//         });
//         res.json({ success: true, message: "Plant updated successfully!" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Failed to update plant" });
//     }
// };


export {addPlant,listPlant,removePlant};