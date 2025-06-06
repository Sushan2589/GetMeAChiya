// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  username: { type: String, required: true, unique: true },
  name: String,
  profilepic: String,
});


export default mongoose.models.User || mongoose.model("User", UserSchema);
