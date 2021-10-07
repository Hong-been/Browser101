"use strict";

const CARROT_SIZE = 80;
const WINNER = "🤩 WOW! YOU WON! 🤩";
const LOSER = "🤯 YOU LOST! TRY AGAIN! 🤯";
const REPLAY = "🐞 REPLAY? 🐞";
const ITEM_COUNT = 10;
const DURATION_SEC = 5;

const introWindow = document.querySelector(".intro");
const playBtn = document.querySelector(".intro__play");

const timer = document.querySelector(".header__timer");
const counter = document.querySelector(".header__remaining");
const pauseBtn = document.querySelector(".pause");

const field = document.querySelector(".field__items");
const result = document.querySelector(".field__result");
const replayBtn = document.querySelector(".result__replay");
const resultMessage = document.querySelector(".result__message");

const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const alertSound = new Audio("./sound/alert.wav");

class Timer {
	constructor(duration, display, printDone) {
		this.duration = duration;
		this.display = display;
		this.callBack = printDone;
		this.state = "running";
	}
	resume() {
		if (this.state === "paused" && !this.interval) {
			this.state = "running";
			this.interval = setInterval(() => {
				this.update();
			}, 1000);
		}
	}
	pause() {
		this.state = "paused";
		clearInterval(this.interval);
		this.interval = null;
	}
	update() {
		this.duration--;
		if (this.duration <= 0) {
			clearInterval(this.interval);
			this.interval = null;
			this.callBack(false);
		}
		this.mins = `${parseInt(this.duration / 60)}`;
		this.secs = `${this.duration % 60}`;
		this.display.innerHTML = `${this.mins.padStart(
			2,
			"0"
		)}:${this.secs.padStart(2, "0")}`;
	}
	start() {
		if (this.state === "running") {
			if (!this.interval) {
				this.interval = setInterval(() => {
					this.update();
				}, 1000);
			}
		}
	}
}

let started = false;
let score = 0;
let timerObj;

initGame();

function initGame() {
	playBtn.addEventListener("click", startGame);
	replayBtn.addEventListener("click", initGame);
	pauseBtn.addEventListener("click", controlPause);
	field.addEventListener("click", removeItem);

	score = 0;
	pauseBtn.innerHTML = `<i class="fas fa-pause"></i>`;
	timer.innerText = DURATION_SEC;
	counter.innerText = ITEM_COUNT;
	timerObj = new Timer(DURATION_SEC, timer, endGame);
	field.innerHTML = "";

	addItem("carrot", ITEM_COUNT, "img/carrot.png");
	addItem("bug", ITEM_COUNT, "img/bug.png");

	hideElement(pauseBtn);
	hideElement(counter);
	hideElement(timer);
	hideElement(field);
	hideElement(result);

	showElement(introWindow);
}

function startGame() {
  started=true;
	playAudio(bgSound);
	timerObj.start();

	showElement(pauseBtn);
	showElement(counter);
	showElement(timer);
	showElement(field);
	hideElement(result);
	hideElement(introWindow);
}

function endGame(win) {
	score = 0;
	timerObj.pause();

	pauseAudio(bgSound);
	showResultPopUp(win);

	field.removeEventListener("click", removeItem);
	pauseBtn.removeEventListener("click", controlPause);
	playBtn.removeEventListener("click", startGame);
}

function showResultPopUp(win) {
	if (win) {
		resultMessage.innerText = WINNER;
		playAudio(winSound);
	} else {
		resultMessage.innerText = LOSER;
		playAudio(alertSound);
	}
	showElement(result);
}

function showReplayPopUp() {
	resultMessage.innerText = REPLAY;
	showElement(result);
}

function controlPause() {
	hideElement(timer);
	hideElement(field);

	if (started) {
		timerObj.pause();
		pauseBtn.innerHTML = `<i class="fas fa-play"></i>`;
		pauseAudio(bgSound);
		playAudio(alertSound);
    showReplayPopUp();
	} else {
    hideElement(result);
    showElement(timer);
    showElement(field);

		timerObj.resume();
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
		resultMessage.innerText = WINNER;
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
    item.setAttribute("draggable",false);
		item.style.transform = `translate(${left}px,${top}px) scale(1.0)`;
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

function hideElement(target) {
	target.classList.add("hidden");
}

function showElement(target) {
	target.classList.remove("hidden");
}
