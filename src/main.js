'use strict';
import Timer from "./timer.js";
import PopUp from "./popup.js";

const CARROT_SIZE = 80;
const WINNER = "🤩 WOW! YOU WON! 🤩";
const LOSER = "🤯 YOU LOST! TRY AGAIN! 🤯";
const REPLAY = "🐞 REPLAY? 🐞";
const ITEM_COUNT = 10;
const DURATION_SEC = 5;

const introPopUp = document.querySelector(".intro");
const introPopUpBtn = document.querySelector(".intro__play");

const header=document.querySelector(".header");
const timer = document.querySelector(".header__timer");
const counter = document.querySelector(".header__remaining");
const pauseBtn = document.querySelector(".header__pause");

const field = document.querySelector(".field");

const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const alertSound = new Audio("./sound/alert.wav");

let started = false;
let score = 0;
let gameTimer;

const gameReplayBanner=new PopUp();
gameReplayBanner.setClickListner(initGame);

initGame();

function initGame() {
	gameReplayBanner.hide();
	
	introPopUpBtn.addEventListener("click", startGame);
	
	pauseBtn.addEventListener("click", controlPause);
	field.addEventListener("click", removeItem);

	score = 0;
	pauseBtn.innerHTML = `<i class="fas fa-pause"></i>`;
	timer.innerText = DURATION_SEC;
	counter.innerText = ITEM_COUNT;
	gameTimer = new Timer(DURATION_SEC, timer, endGame);
	field.innerHTML = "";

	addItem("carrot", ITEM_COUNT, "img/carrot.png");
	addItem("bug", ITEM_COUNT, "img/bug.png");

	header.classList.add("header--hide");
	field.classList.add("field--hide");
	
	introPopUp.classList.remove("intro--hide");
}

function startGame() {
  started=true;
	playAudio(bgSound);
	gameTimer.start();

	header.classList.remove("header--hide");
	field.classList.remove("field--hide");

	introPopUp.classList.add("intro--hide");
}

function endGame(win) {
	started=false;
	score = 0;
	gameTimer.pause();

	pauseAudio(bgSound);

	if (win) {
		gameReplayBanner.showWithText(WINNER);
		playAudio(winSound);
	} else {
		gameReplayBanner.showWithText(LOSER);
		playAudio(alertSound);
	}
	
	field.removeEventListener("click", removeItem);
	pauseBtn.removeEventListener("click", controlPause);
	introPopUpBtn.removeEventListener("click", startGame);
}

function controlPause() {
	field.classList.add("field--hide");
	
	if (started) {
		gameTimer.pause();
		gameReplayBanner.showWithText(REPLAY);
		pauseBtn.innerHTML = `<i class="fas fa-play"></i>`;
		pauseAudio(bgSound);
		playAudio(alertSound);
	} else {
		gameReplayBanner.hide();
    header.classList.remove("header--hide");
		field.classList.remove("field--hide");

		gameTimer.resume();
		pauseBtn.innerHTML = `<i class="fas fa-pause"></i>`;
		playAudio(bgSound);
	}
	started = !started;
}

function removeItem(event) {
	const { target } = event;
	if (!target.matches("img")) return;

	if (target.matches(".bug")) {
		playAudio(bugSound);
		return;
	}

	target.remove();
	score += 1;
	playAudio(carrotSound);
	counter.innerText = ITEM_COUNT - score;
	if (ITEM_COUNT === score) {
		endGame(true);
	}
}

function addItem(className, num, imgPath) {
	const width = field.getBoundingClientRect().width - CARROT_SIZE;
	const height = field.getBoundingClientRect().height - CARROT_SIZE;
	const fragment = new DocumentFragment();

	for (let i = 0; i < num; i++) {
		const random = (max) => Math.floor(Math.random() * max);
		const top = random(height);
		const left = random(width);

		const item = document.createElement("img");
		item.setAttribute("src", imgPath);
		item.setAttribute("class", className);
    item.setAttribute("draggable", false);
		item.style.transform = `translate(${left}px,${top}px)`;
		fragment.appendChild(item);
	}
	field.appendChild(fragment);
}

function playAudio(audio) {
	audio.currentTime = 0;
	audio.play();
}

function pauseAudio(audio) {
	audio.pause();
}

