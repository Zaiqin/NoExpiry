import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const itemSchema = new Schema({
    user: { // Reference to the user who owns the item
        type: String,//mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    category: { // Optional: Category of food (e.g., dairy, produce)
        type: String 
    }, 
    expiryDate: { 
        type: Date, 
        required: true 
    },
    notes: { // Optional: Additional notes about the item
        type: String 
    }, 
    created_date: {
        type: Date,
        default: Date.now
    }
});
