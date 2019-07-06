import store from "store"

import { Round } from "./schemas"
import { newRound, getCurrentBTCValue } from "./helpers"

const initStore = async (io) => {
	store.set('timer', 4);
  store.set('bettingRound', newRound());
	store.set('playingRound', newRound());
  store.set('currentValue', await getCurrentBTCValue());
  store.set('previousRounds', [])
	store.set('placedBet', []);
}

export default initStore
