import mongoose from "mongoose";

const staffsscheema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    // staff_Id: {
    //     type: Number,
    //     required: true
    // },
    // age: {
    //     type: Number,
    //     required: true
    // },
    // phone_Number: {
    //     type: Number,
    //     required: true
    // },
    // profileImage: {
    //     type: String,
    //     required: true
    // },
},
{
    timestamps: true //createdAt, updatedAt
});

const Staffs = mongoose.model('staffs', staffsscheema);

export default Staffs;