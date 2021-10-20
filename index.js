const express = require ("express");
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');

// const port = 7001;
const port = process.env.PORT;
const url = process.env.URL;
// console.log("urll",url);


const connect = async () => {
    try {
        const connection = await mongoose.connect(url,
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        console.log("connected")
    } catch (error) {
        console.log("some error occured")
        console.log("error", error)
    }
}
connect()
app.listen(port, () => {
    console.log(`server is up on port  ${port}`);
})


app.use(cors());
app.use(bodyParser.json());

const userRoutes = require("./routes/user.routes");
const blogRoutes =require("./routes/blog.routes");
const productRoutes = require("./routes/product.routes")
app.use(userRoutes);
app.use(blogRoutes);
app.use(productRoutes);