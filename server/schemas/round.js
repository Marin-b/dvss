import mongoose from "mongoose"

const Schema = mongoose.Schema;

const roundSchema = new Schema ({
  endTime : {
    type: String,
    required: true
  },
  bets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Bet'
    }
  ],
  value: {
    type: Number,
    required: false
  },
  direction: {
    type: String,
    required: false
  }
})

const Round = mongoose.model('Round', roundSchema);


export default Round
