import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-timer',
	templateUrl: './timer.component.html',
	styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

	public timerProgress = 0;
	private idTimeout: number;
	private timerAmount = 1000;
	private _started: Boolean;
	private _paused: Boolean = false;

	@Input() private timer = 10000;
	@Input() private autoStart: Boolean = true;
	@Input() private decrement: Boolean = true;

	@Output() private Finish: EventEmitter<number> = new EventEmitter();
	@Output() private Start: EventEmitter<number> = new EventEmitter();

	constructor() { }

	ngOnInit() {
		if (this.autoStart) {
			this.start();
		}
	}

	reStart() {
		this.clear();
		this.start();
	}

	start() {
		if (!this._paused && this._started) {
			return;
		}
		if (this.Start) {
			this.Start.emit();
		}
		if (this.decrement) {
			this.timerAmount *= -1;
			this.timerProgress = this.timer;
		}
		this.idTimeout = setTimeout(this.counter.bind(this), Math.abs(this.timerAmount));
	}

	isStarted(): Boolean {
		return this._started;
	}

	pause() {
		this._paused = true;
		if (this.idTimeout) {
			clearTimeout(this.idTimeout);
		}
	}

	isPaused() {
		return this._paused;
	}

	resume() {
		this._paused = false;
		this.idTimeout = setTimeout(this.counter.bind(this), Math.abs(this.timerAmount));
	}

	clear() {
		this.timerProgress = 0;
		this._started = false;
		if (this.idTimeout) {
			clearTimeout(this.idTimeout);
		}
	}

	private counter() {
		this.timerProgress = this.timerProgress + this.timerAmount;
		if ((this.decrement && this.timerProgress <= 0) ||
			(this.decrement && this.timerProgress >= this.timer)) {
			if (this.Finish) {
				this.Finish.emit();
			}
		} else {
			this.idTimeout = setTimeout(this.counter.bind(this), Math.abs(this.timerAmount));
		}
	}
}
