"use strict";
import PopUp from "./popup.js";
import Intro from "./intro.js";
import Game from "./game.js";

const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const DURATION_SEC = 5;

const WINNER = "✨ WOW! YOU WON! ✨";
const LOSER = "👽 YOU LOST! TRY AGAIN! 👽";
const REPLAY = "🐞 REPLAY? 🐞";

const gameReplayBanner = new PopUp();
const game = new Game(DURATION_SEC, CARROT_COUNT, BUG_COUNT);
const gameIntroBanner = new Intro();


gameIntroBanner.setClickListner(game.start);
gameReplayBanner.setClickListner(game.init);

game.setGameReadyListner(gameIntroBanner.show);
game.setGameResumeListner(()=>{gameReplayBanner.hide();});
game.setGameStopListner((reason) => {
	switch (reason) {
		case "win":
			gameReplayBanner.showWithText(WINNER);
			break;
		case "lose":
			gameReplayBanner.showWithText(LOSER);
			break;
		case "stop":
			gameReplayBanner.showWithText(REPLAY);
			break;
		default:
			throw new Error("not valid error");
	}
});
game.init();
