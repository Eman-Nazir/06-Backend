// require('dotenv').config({path:'.env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config();

connectDB()
// async return us promise

.then(() => {
  app.on("error" , (error)=>{
    console.log("ERROR", error);
    throw error
  })
  
  app.listen(process.env.PORT || 8000, () =>{
    console.log(`Server is runing at port : ${process.env.PORT}`);
  })
})

.catch((err) => {
  console.log("MongoDB Connection failed !!!" , err );
  
});
































