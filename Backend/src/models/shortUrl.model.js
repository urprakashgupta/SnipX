import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
    original_Url: {
        type: String,
        required: true,
    },
    short_Url: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true });

const shortUrlModel = mongoose.model("ShortUrl", shortUrlSchema);
export default shortUrlModel;