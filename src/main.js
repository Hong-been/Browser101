'use strict';
import Timer from "./timer.js";

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
const gamePopUp = document.querySelector(".popup");
const gamePopUpBtn = document.querySelector(".popup__button");
const gamePopUpTxt = document.querySelector(".popup__txt");

const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const alertSound = new Audio("./sound/alert.wav");

let started = false;
let score = 0;
let gameTimer;

initGame();

function initGame() {
	introPopUpBtn.addEventListener("click", startGame);
	gamePopUpBtn.addEventListener("click", initGame);
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
	gamePopUp.classList.add("popup--hide");

	introPopUp.classList.remove("intro--hide");
}

function startGame() {
  started=true;
	playAudio(bgSound);
	gameTimer.start();

	header.classList.remove("header--hide");
	field.classList.remove("field--hide");

	gamePopUp.classList.add("popup--hide");
	introPopUp.classList.add("intro--hide");
}

function endGame(win) {
	score = 0;
	gameTimer.pause();

	pauseAudio(bgSound);
	showResultPopUp(win);

	field.removeEventListener("click", removeItem);
	pauseBtn.removeEventListener("click", controlPause);
	introPopUpBtn.removeEventListener("click", startGame);
}

function showResultPopUp(win) {
	if (win) {
		gamePopUpTxt.innerText = WINNER;
		playAudio(winSound);
	} else {
		gamePopUpTxt.innerText = LOSER;
		playAudio(alertSound);
	}
	gamePopUp.classList.remove("popup--hide");
}

function showReplayPopUp() {
	gamePopUpTxt.innerText = REPLAY;
	gamePopUp.classList.remove("popup--hide");
}

function controlPause() {
	field.classList.add("field--hide");

	if (started) {
		gameTimer.pause();
		pauseBtn.innerHTML = `<i class="fas fa-play"></i>`;
		pauseAudio(bgSound);
		playAudio(alertSound);
    showReplayPopUp();
	} else {
		gamePopUp.classList.add("popup--hide");
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
		gamePopUpTxt.innerText = WINNER;
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

