const express = require('express');
const mongoose = require('mongoose');
const env= require('dotenv');
const app= express();
const bodyParser = require('body-parser');
env.config();

//routes
const UserRoutes= require('./routes/user');
const CategoryRoutes= require('./routes/category');
const ProductRoutes= require('./routes/product');

app.use(bodyParser());
app.use('/api',UserRoutes);
app.use('/api',CategoryRoutes);
app.use('/api',ProductRoutes);
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.g8y0o.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=>{
    console.log('Database connected successfully');
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`);
})