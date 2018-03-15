import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { People } from '../../../../shared/models/people.model';
import { PeopleService } from '../../../../shared/services/people/people.service';

@Component({
	selector: 'app-card-people',
	templateUrl: './card-people.component.html',
	styleUrls: ['./card-people.component.scss']
})
export class CardPeopleComponent implements OnInit {

	image = '';

	@Input() people: People;
	@Input() status: 'error' | 'success' | 'success-half' | 'none' = 'none';

	@Output() clickDetail: EventEmitter<People> = new EventEmitter();
	@Output() clickAnswer = new EventEmitter();

	constructor(private peopleService: PeopleService) { }

	ngOnInit() {
	}

	getImage() {
		return `./assets/characters/${this.people.id}.jpg`;
	}

	onClickEventEmmiter(evt: EventEmitter<People>) {
		evt.emit(this.people);
	}

	getDisabled(): Boolean {
		return this.status === 'none' ? false : true;
	}
}
