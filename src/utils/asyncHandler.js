//this can be done in two ways by promise or try/catch
const asyncHandler=(rquestHandler)=>{
    (req,res,next)=>{
         Promise.resolve(requestHandler(req,res,next)).
         catch((error)=>{next(error)})

    }
    
}
















// const asyncHandler=(fn)=>async(req,res,next)=>{
//     try{

//         await fn(req,res,next)
//     }
//     catch(error){
//         res.status(error.code||500).json({success:false,
//             message:error.message
//         })

//     }

// }
export {asyncHandler}