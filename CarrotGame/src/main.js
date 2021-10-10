"use strict";
import PopUp from "./popup.js";
import Intro from "./intro.js";
import { GameBuilder, Reason } from "./game.js";

const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const DURATION_SEC = 5;

const WINNER = "✨ WOW! YOU WON! ✨";
const LOSER = "👽 YOU LOSE!! 👽";
const REPLAY = "🐞 REPLAY? 🐞";

const gameReplayBanner = new PopUp();
const gameIntroBanner = new Intro();
const game = new GameBuilder().withGameDuration(DURATION_SEC)
															.withCarrotCount(CARROT_COUNT)
															.withBugCount(BUG_COUNT)
															.build();


gameIntroBanner.setClickListner(game.start);

game.setGameReadyListner(gameIntroBanner.show);
game.setGameResumeListner(gameReplayBanner.hide);
game.setGameStopListner((reason) => {
	let message;
	switch (reason) {
		case Reason.win:
			message=WINNER;
			break;
		case Reason.lose:
			message=LOSER;
			break;
		case Reason.pause:
			message=REPLAY;
			break;
		default:
			throw new Error("not valid error");
	}
	gameReplayBanner.showWithText(message);
});
gameReplayBanner.setClickListner(game.init);
game.init();
