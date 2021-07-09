const express = require('express');
const app = express();


const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoute = require('./src/routes/user')
const authRoute = require('./src/routes/auth')

dotenv.config();



//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
// app.get("/",(req,res)=>{
//     res.send("welcome to home page");
// })

app.listen(8800,()=>{
    console.log("Server is listening to 8800..")
})