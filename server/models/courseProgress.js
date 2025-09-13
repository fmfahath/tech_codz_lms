import mongoose, { Schema } from "mongoose";

const courseProgressSchema = new Schema({
    userId: { type: String, required: true },
    courseId: { type: String, required: true },
    completed: { type: Boolean, default: false },
    lectureCompleted: [],
}, { minimize: false });

const courseProgressModel = mongoose.model('CourseProgress', courseProgressSchema);

export default courseProgressModel;