'use strict';
import Timer from "./timer.js";
import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from './sound.js';

const WINNER = "🤩 WOW! YOU WON! 🤩";
const LOSER = "🤯 YOU LOST! TRY AGAIN! 🤯";
const REPLAY = "🐞 REPLAY? 🐞";
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const DURATION_SEC = 5;

const introPopUp = document.querySelector(".intro");
const introPopUpBtn = document.querySelector(".intro__play");

const header=document.querySelector(".header");
const timer = document.querySelector(".header__timer");
const counter = document.querySelector(".header__remaining");
const pauseBtn = document.querySelector(".header__pause");


let started;
let score;
let gameTimer;

const gameReplayBanner=new PopUp();
const gameField=new Field(CARROT_COUNT,BUG_COUNT);

initGame();

function initGame() {
	score = 0;
	started=false;

	gameReplayBanner.hide();
	
	introPopUpBtn.addEventListener("click", startGame);
	
	pauseBtn.addEventListener("click", controlPause);

	gameField.init();
	gameField.setClickListner(onItemClick);
	gameField.hide();
	
	pauseBtn.innerHTML = `<i class="fas fa-pause"></i>`;
	timer.innerText = DURATION_SEC;
	counter.innerText = CARROT_COUNT;
	gameTimer = new Timer(DURATION_SEC, timer, endGame);
	

	header.classList.add("header--hide");

	introPopUp.classList.remove("intro--hide");
}

function startGame() {
  started=true;
	sound.playBackground();
	gameTimer.start();

	header.classList.remove("header--hide");
	gameField.show();

	introPopUp.classList.add("intro--hide");
}

function endGame(win) {
	started=false;
	gameTimer.pause();

	sound.stopBackground();

	if (win) {
		gameReplayBanner.showWithText(WINNER);
		sound.playWin();
	} else {
		gameReplayBanner.showWithText(LOSER);
		sound.playAlert();
	}
	
	pauseBtn.removeEventListener("click", controlPause);
	introPopUpBtn.removeEventListener("click", startGame);
}

function controlPause() {
	gameField.hide();
	
	if (started) {
		gameTimer.pause();
		gameReplayBanner.showWithText(REPLAY);
		pauseBtn.innerHTML = `<i class="fas fa-play"></i>`;
		sound.stopBackground();
		sound.playAlert();
	} else {
		gameReplayBanner.hide();
    header.classList.remove("header--hide");
		gameField.show();

		gameTimer.resume();
		pauseBtn.innerHTML = `<i class="fas fa-pause"></i>`;
		sound.playBackground();
	}
	started = !started;
}

function onItemClick(item) {
	console.log(item);
	if (!started) return;
	if(item==='carrot'){
		score += 1;
		counter.innerText = CARROT_COUNT - score;
		if (CARROT_COUNT === this.score) {
			endGame(true);
		}
	}
}

