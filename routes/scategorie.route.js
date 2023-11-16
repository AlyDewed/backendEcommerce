const express = require('express');

const router=express.Router();

const Scategorie = require('../models/scategorie');

//liste de scategorie
router.get('/', async (req, res )=> {
    try {
        const cat = await Scategorie.find();
        res.status(200).json(cat );
        } catch (error) {
        res.status(404).json({ message: error.message });
        }

})

//create new scategorie
router.post('/', async (req, res)=> {
    const newscategorie = new Scategorie(req.body)
        try{
            await newscategorie.save()
            res.status(200).json(newscategorie);
        }
        catch (error) {
            res.status(404).json({ message : error.message });
        }

})

//search for scategorie
router.get('/:scategorieID',async(req, res)=>{
        
    try {
    const scat = await Scategorie.findById(req.params.scategorieID);
    
    res.status(200).json(scat);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });

//modify sous categorie
router.put('/:scategorieID', async (req, res)=> {
    try {
    const scat1 = await Scategorie.findByIdAndUpdate(
    req.params.scategorieID,
    { $set: req.body },
    { new: true }
    );
    res.status(200).json(scat1);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });

//delete sous categorie
router.delete('/:scategorieID', async (req, res)=> {
    try{
        await Scategorie.findByIdAndDelete(req.params.scategorieID);
        res.json({ message: "scategorie deleted successfully." });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }

})

module.exports = router;