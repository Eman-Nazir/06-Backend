import express, { urlencoded } from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import { asyncHandler } from "./utils/asyncHandler.js";
import { ApiError } from "./utils/ApiError.js";
import { ApiResponse } from "./utils/ApiResponse.js";
const app = express();
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))
// configuration 
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true , limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())














// without utils file 
// app.get("/user", async (req, res) => {
//   try {
//     // Scenario User exists
//     const user = { name: "Hina", age: 21 }; 

//     // Scenario  User not found
//     // const user = null;

//     // Scenario  Runtime error
//     // user.name.toUpperCase(); 
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       data: user,
//       message: "User fetched successfully"
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// });
// with utils file 
app.get("/user", asyncHandler(async (req, res) => {
  const user = { name: "Eman", age: 21 };
  // const user = null

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));

}));

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    errors: err.errors || []
  });
});

export {app};































































// app.use ===>  used when we have to use middleware adn configuration 

// app.use(express.json({limit:"16kb"}))
// with json we can receive the json data from body 
// like when we fill teh form 

// app.use(express.urlencoded({extended:true , limit:"16kb"}))
// when we receive the data from url 
//  space urlencoded is %20 
// extended object inside object  ==> its optional to use 


// app.use(express.static("public"))
// public assets store 


// app.use(cookieParser())
// server sa user ka browser ki cookies ko access or set kar saky 
// or cookies pr crud operation apply kar sako 



// Middleware 
// next is flag  used when we are dealing with middleware 