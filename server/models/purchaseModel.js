import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        Required: true
    },
    userId: {
        type: String,
        ref: 'User',
        Required: true
    },
    amount: {
        type: Number,
        Required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    }
}, { timestamps: true })


const purchaseModel = mongoose.model('Purchase', purchaseSchema)

export default purchaseModel;