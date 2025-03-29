import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  clerkId: string;  
  name: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
