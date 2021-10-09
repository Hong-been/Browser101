'use strict';

export default class Timer {
	constructor(duration) {
		this.duration = duration;
		this.display = document.querySelector(".header__timer");
		this.display.innerText=this.duration;
		this.isRunning = true;
	}
	setEndCallBack(callBack){
		this.callBack=callBack;
	}
	resetTime(duration){
		this.duration=duration;
		this.display.innerText=this.duration;
		this.isRunning = true;
	}
	resume() {
		if ( !this.isRunning && !this.interval) {
			this.isRunning = true;
			this.interval = setInterval(() => {
				this.update();
			}, 1000);
		}
	}
	pause() {
		this.isRunning = false;
		clearInterval(this.interval);
		this.interval = null;
	}
	update() {
		if(this.isRunning){
			this.duration--;
			if (this.duration <= 0) {
				clearInterval(this.interval);
				this.interval = null;
				this.callBack(false);
			}else{
				this.mins = `${parseInt(this.duration / 60)}`;
				this.secs = `${this.duration % 60}`;
				this.display.innerHTML = `${this.mins.padStart(
					2,
					"0"
				)}:${this.secs.padStart(2, "0")}`;
			}
		}
	}
	start() {
		if (this.isRunning) {
			if (!this.interval) {
				this.interval = setInterval(() => {
					this.update();
				}, 1000);
			}
		}
	}
}
