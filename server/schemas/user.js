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
  },
  placedBet: {
    type: Boolean
  }
});

const User = mongoose.model('User', userSchema);

export default User;
