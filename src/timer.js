'use strict';

export default class Timer {
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
