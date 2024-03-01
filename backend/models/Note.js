const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for Note Collection
const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: 'General'
    }, 
    date: {
        type: String,
        default: Date.now
    }
});

// model for Note collection based on the schema
const Notes = mongoose.model('note', NotesSchema);

module.exports = Notes;