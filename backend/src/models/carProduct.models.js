import mongoose from "mongoose";

const carproductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    carImage: [{

        data: Buffer,
        contentType: String
    }],
    description: String,
    topic: String,
    // tags: String 
    tags: { type: String, required: true }
}, {
    timestamps: true
});

export const carProduct = mongoose.model('carProduct', carproductSchema);
