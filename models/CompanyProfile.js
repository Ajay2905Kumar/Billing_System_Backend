import mongoose from "mongoose";

const companyProfileSchema = mongoose.Schema({
    companyId:{
        type: Number,
        unique: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    GSTIN: {
        type: Number,
        required: true,
        unique: true,
    },
    noOfBills: {
        type: Number,
    },
    address: {
        type: String,
        required: true,
    },
    GST: {
        type: Number,
        required: true,
    },
});

export default mongoose.model("CompanyProfile", companyProfileSchema);