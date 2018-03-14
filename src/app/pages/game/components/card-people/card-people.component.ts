import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { People } from '../../../../shared/models/people.model';

@Component({
	selector: 'app-card-people',
	templateUrl: './card-people.component.html',
	styleUrls: ['./card-people.component.scss']
})
export class CardPeopleComponent implements OnInit {

	@Input() people: People;
	@Input() status: 'error' | 'success' | 'success-half' | 'none' = 'none';

	@Output() clickDetail: EventEmitter<People> = new EventEmitter();
	@Output() clickAnswer = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

	onClickEventEmmiter(evt: EventEmitter<People>) {
		evt.emit(this.people);
	}

	getDisabled(): Boolean {
		return this.status === 'none' ? false : true;
	}
}
