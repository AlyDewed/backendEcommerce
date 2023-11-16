const express = require('express');

const Categorie = require('../models/categorie');

const router=express.Router();


router.get('/', async (req, res )=> {
    try {
const cat = await Categorie.find();
res.status(200).json(cat );
} catch (error) {
res.status(404).json({ message: error.message });
}
    });

router.post("/",async(req,res)=>{
        //console.log("POST request");
        const newcategorie = new Categorie(req.body)
        try{
            await newcategorie.save()
            res.status(200).json(newcategorie);
        }
        catch (error) {
            res.status(404).json({ message : error.message });
        }
    });

    router.get('/:categorieId',async(req, res)=>{
        
        try {
        const cat = await Categorie.findById(req.params.categorieId);
        
        res.status(200).json(cat);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        });

router.delete('/:categorieId', async (req, res)=> {
    try{
        await Categorie.findByIdAndDelete(req.params.categorieId);
        res.json({ message: "categorie deleted successfully." });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    
});

router.put('/:categorieId', async (req, res)=> {
    try {
    const cat1 = await Categorie.findByIdAndUpdate(
    req.params.categorieId,
    { $set: req.body },
    { new: true }
    );
    res.status(200).json(cat1);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });

module.exports = router;

