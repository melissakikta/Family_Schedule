import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});

const EventSchema = new mongoose.Schema({
  username: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  link: { type: String },
  imgURL: { type: String },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const CommentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: String, default: Date.now }
});

export const User = mongoose.model('User', UserSchema);
export const Post = mongoose.model('Post', PostSchema);
export const Comment = mongoose.model('Comment', CommentSchema);