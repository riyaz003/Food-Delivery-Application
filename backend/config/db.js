import mongoose from "mongoose";

// export const connectDB = async()=>{
//     (await mongoose.connect('mongodb+srv://naven2723:D2ZUy38zVXzOLhIg@cluster0.to8o0.mongodb.net/food-del').then(()=>console.log('DataBase is connected successfully')));
// }

export const connectDB = async()=>{
    (await mongoose.connect('mongodb+srv://naven2723:D2ZUy38zVXzOLhIg@cluster0.to8o0.mongodb.net/food-del').then(()=>console.log('DataBase is connected successfully')));
}
