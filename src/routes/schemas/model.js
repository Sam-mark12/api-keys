import mongoose from "mongoose";


const StudentSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    age : {
        type : Number,
        required : true,
    }
});

export const studentModel = new mongoose.model("student",StudentSchema);