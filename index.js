const express = require("express");
const app = express();

app.set("view engine","ejs");

app.use(express.static('public'));
app.use(express.static('node_modules'));
const data = [
    {id: 1, name:"İphone 14", price:30000,isActive: true,imageUrl:"1.jpeg"},
    {id: 2, name:"İphone 15", price:40000,isActive: false,imageUrl:"2.jpeg"},
    {id: 3, name:"İphone 16", price:50000,isActive: true,imageUrl:"3.jpeg"},
];

// routes
app.use("/products/:id" ,function(req,res){
    const urun = data.find(u => u.id == req.params.id);
    res.render("products-details", urun);
});

app.use("/products" ,function(req,res){
    res.render("products",{urunler: data});
});

app.use("/" ,function(req,res ){
    res.render("index");
});

app.listen(3000, ()=> {
   console.log("listening on port 3000"); 
});