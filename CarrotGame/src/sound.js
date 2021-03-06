
const bugSound = new Audio("./sound/bug_pull.mp3");
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const bgSound = new Audio("./sound/bg.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const alertSound = new Audio("./sound/alert.wav");

export function playCarrot(){
  playSound(carrotSound);
}
export function playBug(){
  playSound(bugSound);
}
export function playAlert(){
  playSound(alertSound);
}
export function playWin(){
  playSound(winSound);
}
export function playBackground(){
  playSound(bgSound);
}
export function stopBackground(){
  pauseSound(bgSound);
}

function playSound(audio) {
	audio.currentTime = 0;
	audio.play();
}

function pauseSound(audio) {
	audio.pause();
}
