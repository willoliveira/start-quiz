import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-timer',
	templateUrl: './timer.component.html',
	styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

	private timerProgress = 0;

	@Input() timer = 10000;
	@Input() timerAdded = 1000;
	@Input() autoStart: Boolean = true;
	@Input() decrement: Boolean = true;

	@Output() Finish: EventEmitter<number> = new EventEmitter();
	@Output() Start: EventEmitter<number> = new EventEmitter();

	constructor() { }

	ngOnInit() {
		if (this.autoStart) {
			this.start();
		}
	}

	start() {
		if (this.Start) {
			this.Start.emit();
		}
		if (this.decrement) {
			this.timerAdded *= -1;
			this.timerProgress = this.timer;
		}
		setTimeout(this.counter.bind(this), Math.abs(this.timerAdded));
	}

	private counter() {
		this.timerProgress = this.timerProgress + this.timerAdded;
		if ((this.decrement && this.timerProgress <= 0) ||
			(this.decrement && this.timerProgress >= this.timer)) {
			if (this.Finish) {
				this.Finish.emit();
			}
		} else {
			setTimeout(this.counter.bind(this), Math.abs(this.timerAdded));
		}
	}
}
