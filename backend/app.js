const express = require("express");
const app = express();
const cookieParse = require("cookie-parser");
const cors = require("cors");
const path = require('path');


 app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParse());
app.use(cors({origin:true,credentials:true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const userRoutes = require("./routes/userRoutes");

const productRoutes = require("./routes/productRoutes");


app.use('/api/v1/user',userRoutes);

app.use('/api/v1/product',productRoutes);

module.exports = app;