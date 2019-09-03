import mongoose from 'mongoose';

const withdrawSchema = new mongoose.Schema({
  withdrawalId: {
    type: String
  },
  userId: {
    type: String
  }
});

const Withdraw = mongoose.model('Withdraw', withdrawSchema);

export default Withdraw;
