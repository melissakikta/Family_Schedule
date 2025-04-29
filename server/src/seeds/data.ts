import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});

const EventSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


export const User = mongoose.model('User', UserSchema);
export const Post = mongoose.model('Post', EventSchema);