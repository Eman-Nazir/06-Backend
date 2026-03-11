//  Promise

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };




















// const asyncHandler=()=>{}
// const asyncHandler = (func) =>{()=>{}}
// just remove the qurly brackets
// HOF
// const asyncHandler = (func) => ()=>{}
// const asyncHandler = (func) => ()=>{}
// async
// const asyncHandler = (func) => async ()=>{}

// trycatch

// const asyncHandle = (fn) => async(req,res,next)=>{
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }

// asyncHnadler is HOF
// HOF  is a function that accept function as paramerter  or return it traeeted as variabel
