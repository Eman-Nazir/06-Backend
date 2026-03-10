// require('dotenv').config({path:'.env'})
//  we dont use this because it cause error as we use the type  module  not common 

import dotenv from "dotenv";
import  app from "./app.js"
import connectDB from "./db/index.js";


app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });

// 1.. 
// dotenv.config();
// console.log(process.env.PORT);
// console.log(process.env.MONGODB_URI);

// 2.. 

// dotenv.config({
//   path: ".env",
// });
// console.log(process.env.PORT);
// console.log(process.env.MONGODB_URI);

// 3.. 
// in package.json by using a flag
// "dev": "nodemon  -r dotenv/config --experimental-json-modules   src/index.js"

connectDB();

































// 1st Approach


// import mongoose from "mongoose"
// import {DB_NAME} from "./constants"
// import express from express
// const app = express()
// // function connectDb(){
// // }
// // connectDb()
// // IIFE
// // a JavaScript function that runs as soon as it is defined
// ;(async()=>{

//     try {
//          await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//          app.on("error" , (error)=>{
//             console.log("ERROR" ,error);
//             throw error

//          })
//       app.listen(process.env.PORT , () =>{
//         console.log(`App is listening in port ${process.env.PORT}`);

//       })

//     }
//     catch (error) {
//        console.error("Error" , error )
//        throw error
//     }

// })()
