const express=require("express")
const router=express.Router()
const Article = require("../models/article")

//liste de Article
router.get("/",async(req,res)=>{
    try {
        const art = await Article.find()
        res.status(200).json(art)
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
})

//create new Article
router.post("/",async(req,res)=>{
    const newarticle = new Article(req.body)
    try{
        await newarticle.save()
        res.status(200).json(newarticle);
    }
    catch (error) {
        res.status(404).json({ message : error.message });
    }   
})

//search for Article
router.get('/:articleID',async(req, res)=>{     
    try {
    const art = await Article.findById(req.params.articleID);
    res.status(200).json(art);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });

//modify Article
router.put("/:articleID",async(req,res)=>{
    try {
        const scat1 = await Article.findByIdAndUpdate(
        req.params.articleID,
        { $set: req.body },
        { new: true }
        );
        res.status(200).json(scat1);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
})

//delete Article
router.delete("/:articleID",async(req,res)=>{
    try{
        await Article.findByIdAndDelete(req.params.articleID);
        res.json({ message: "Article deleted successfully." });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
})

module.exports = router;
