import dotenv from  "dotenv";
import connectDB from "./db/index.js"


dotenv.config({
    path:"./env"
})

connectDB()



// first approach of making iffi and connecct data 

// import express from "express";

// const app=express();

// (async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)

//         app.on("error",(error)=>{
//             console.log("ERRR",error)
//             throw error
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listen at ${process.env.PORT}`)
//         })

//     }
//     catch(error){
//         console.log("error",error)
//         throw error

//     }
// })()