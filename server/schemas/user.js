import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String
  },
  key: {
    type: String,
    unique: true,
  },
  balance: {
    type: Number
  }
});

const User = mongoose.model('User', userSchema);

export default User;
