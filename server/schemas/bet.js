import mongoose from "mongoose"

const Schema = mongoose.Schema;

const betSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  startValue: {
    type: Number,
    required: true
  },
  endValue: {
    type: Number,
    required: false
  },
  direction: {
    type: String,
    required: true
  },
  gambler: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
})

const Bet = mongoose.model('Bet', betSchema);

export default Bet
