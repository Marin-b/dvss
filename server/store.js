import store from "store"

import { Round } from "./schemas"
import { newRound } from "./helpers"

const initStore = async (io) => {
	const previousRounds = await Round.find().where({'value': {$exists: true}}).sort({'_id': -1}).limit(3)
	store.set('timer', 9);
	store.set('roundId', newRound());
	store.set('C_BTC', {v: previousRounds[0].value, d: previousRounds[0].direction});
	store.set('1_BTC', {v: previousRounds[1].value, d: previousRounds[1].direction});
	store.set('2_BTC', {v: previousRounds[2].value, d: previousRounds[2].direction});
	store.set('placedBet', []);
}

export default initStore