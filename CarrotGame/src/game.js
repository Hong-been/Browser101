"use strick";
import { Field, ItemType } from "./field.js";
import Timer from "./timer.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
	win: "win",
	lose: "lose",
	pause: "pause",
});

export class GameBuilder {
	withGameDuration(duration) {
		this.gameDuration = duration;
		return this;
	}

	withCarrotCount(num) {
		this.carrotCount = num;
		return this;
	}

	withBugCount(num) {
		this.bugCount = num;
		return this;
	}

	build() {
		return new Game(this.gameDuration, this.carrotCount, this.bugCount);
	}
}

class Game {
	constructor(gameDuration, carrotCount, bugCount) {
		this.gameDuration = gameDuration;
		this.carrotCount = carrotCount;
		this.bugCount = bugCount;

    this.gameContainer=document.querySelector(".game");
		this.header = document.querySelector(".header");
		this.counter = document.querySelector(".header__remaining");
		this.pauseBtn = document.querySelector(".header__pause");
		this.pauseBtn.addEventListener("click", ()=>this.stop(Reason.pause));

		this.gameTimer = new Timer(this.gameDuration);
		this.gameTimer.setEndCallBack(()=>this.stop(Reason.lose));

		this.gameField = new Field(this.carrotCount, this.bugCount);
		this.gameField.setItemClickListner(this.onItemClick);

		this.started = false;
		this.score = 0;
	}

	setGameReadyListner(onGameReady) {
		this.onGameReady = onGameReady;
	}

	setGameStopListner(onGameStop) {
		this.onGameStop = onGameStop;
	}

	setGameResumeListner(onGameResume) {
		this.onGameResume = onGameResume;
	}

	init = () => {
		this.started = false;
		this.score = 0;

    this.gameField.init();
    this.hide(this.header);
    this.switchPauseResumeIcon();
    this.updateRemainingCarrot(this.carrotCount);
		this.gameTimer.resetTime(this.gameDuration);
		this.onGameReady();
	};

	start = () => {
		this.started = true;
    
		sound.playBackground();

    this.show(this.header);
    this.show(this.pauseBtn);

    this.gameField.show();
		this.gameTimer.start();
	};

	stop = (reason) => {
		if (this.started) {
			this.gameTimer.pause();
			sound.stopBackground();

			switch (reason) {
				case Reason.win:
					sound.playWin();
          this.hide(this.pauseBtn);
					break;
				case Reason.lose:
					sound.playBug();
          this.hide(this.pauseBtn);
					break;
				case Reason.pause:
					sound.playAlert();
          this.gameField.hide();
          this.switchPauseResumeIcon();
					break;
				default:
					throw new Error("not valid error");
			}

      this.onGameStop && this.onGameStop(reason);
      this.started = false;
		} else {
      this.gameField.show();
			this.gameTimer.resume();
			sound.playBackground();
      this.switchPauseResumeIcon();

      this.onGameResume && this.onGameResume();
			this.started = true;
		}
	};

	onItemClick = (item) => {
		if (!this.started) return;
		if (item === ItemType.carrot) {
			this.score += 1;
      this.updateRemainingCarrot(this.carrotCount - this.score);
			if (this.carrotCount === this.score) {
				this.stop(Reason.win);
			}
		}else if (item === ItemType.bug) {
        this.stop(Reason.lose);
    }
	};

  hide(element){
    element.style.visibility='hidden';
  }

  show(element){
    element.style.visibility='visible';
  }

  switchPauseResumeIcon(){
    if(this.started){
      this.pauseBtn.innerHTML = `<i class="fas fa-play"></i>`;
    }else{
      this.pauseBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    }
  }

  updateRemainingCarrot(num){
    this.counter.innerText = num;
  }
}
