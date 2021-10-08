"use strick";
import Field from "./field.js";
import Timer from "./timer.js";
import * as sound from "./sound.js";

export default class GameBuilder{
  withGameDuration(duration){
    this.gameDuration=duration;
    return this;
  }
  
  withCarrotCount(num){
    this.carrotCount=num;
    return this;
  }
  
  withBugCount(num){
    this.bugCount=num;
    return this;
  }

  build(){
    return new Game(
      this.gameDuration,
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game {
	constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration=gameDuration;
    this.carrotCount=carrotCount;
    this.bugCount=bugCount;

		this.header = document.querySelector(".header");
		this.counter = document.querySelector(".header__remaining");
		this.pauseBtn = document.querySelector(".header__pause");
    this.pauseBtn.addEventListener("click", this.pauseAndResume);

		this.gameTimer = new Timer(this.gameDuration);
		this.gameTimer.setEndCallBack(this.end);

		this.gameField = new Field(this.carrotCount, this.bugCount);
		this.gameField.setItemClickListner(this.onItemClick);

		this.started = false;
		this.score = 0;
	}

  setGameReadyListner(onGameReady){
    this.onGameReady=onGameReady;
  }

  setGameStopListner(onGameStop){
    this.onGameStop=onGameStop;
  }

  setGameResumeListner(onGameResume){
    this.onGameResume=onGameResume;
  }

	init=()=>{
    this.started = false;
		this.score = 0;

    this.header.classList.add("header--hide");
    this.pauseBtn.classList.remove("pauseBtn--hide");
    this.pauseBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    this.counter.innerText = this.carrotCount;
		this.gameTimer.resetTime(this.gameDuration);

		this.gameField.hide();
    this.gameField.init();
		
    this.onGameReady();
	}

	start=()=>{
    this.started = true;
		sound.playBackground();
		this.header.classList.remove("header--hide");
		this.gameField.show();
    this.gameTimer.start();
	}

	end=(win)=>{
		this.started = false;
		this.gameField.removeClickListner();

		sound.stopBackground();
		if (win) {
      this.onGameStop('win');
			sound.playWin();
		} else {
      this.onGameStop('lose');
			sound.playAlert();
		}

    this.gameTimer.pause();
		this.pauseBtn.classList.add("pauseBtn--hide");
	}

  pauseAndResume=()=>{
    this.gameField.hide();
    
    if (this.started) {
      this.onGameStop('stop');
      this.gameTimer.pause();
      this.pauseBtn.innerHTML = `<i class="fas fa-play"></i>`;
      sound.stopBackground();
      sound.playAlert();
      this.started=false;
    } else {
      this.onGameResume && this.onGameResume();
      this.header.classList.remove("header--hide");
      this.gameField.show();
      this.gameTimer.resume();
      this.pauseBtn.innerHTML = `<i class="fas fa-pause"></i>`;
      sound.playBackground();
      this.started=true;
    }
  }
  
  onItemClick=(item)=>{
    if (!this.started)
      return;
    if(item==='carrot'){
      this.score += 1;
      this.counter.innerText = this.carrotCount - this.score;
      if (this.carrotCount === this.score) {
        this.end(true);
      }
    }
  }
}
