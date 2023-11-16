const express=require('express');
const mongoose =require("mongoose")
const dotenv =require('dotenv')
const categorieRouter=require("./routes/categorie.route")
const scategorieRouter=require("./routes/scategorie.route")
const articleRouter=require("./routes/article.route")
//const cors = require('cors')
dotenv.config()
const app = express();

app.use(express.json());

mongoose.set('strictQuery', false)

//const connect = async () => {
//try {
//await mongoose.connect(process.env.DATABASECLOUD);
//console.log("Connected to mongoDB.");
//} catch (error) {
//throw error;
//}
//};

// Connexion à la base données
mongoose.connect(process.env.DATABASECLOUD,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {console.log("Connexion à la base de données réussie");
    }).catch(err => {
    console.log('Impossible de se connecter à la base de données', err);
    process.exit();
    });


mongoose.connection.on("disconnected", () => {
console.log("mongoDB disconnected!");
});



app.use("/api/categories", categorieRouter)
app.use("/api/scategories", scategorieRouter)
app.use("/api/articles", articleRouter)


app.listen(process.env.PORT, () => {
//    connect();
console.log(`Server is listening on port ${process.env.PORT}`); });

module.exports = app;
