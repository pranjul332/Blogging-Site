const mongoose = require('mongoose');

// Define the schema for comments
const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    video: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    liked: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }], // Store user IDs who liked the post
    comments: [CommentSchema], // Embed the CommentSchema as an array
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    } 
}, ); 
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
