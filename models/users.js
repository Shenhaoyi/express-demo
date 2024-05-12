import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String,
  uid: String,
});

const User = mongoose.model('User', UserSchema);

export default User;
