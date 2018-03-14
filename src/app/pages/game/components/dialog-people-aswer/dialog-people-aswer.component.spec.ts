import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPeopleAswerComponent } from './dialog-people-aswer.component';

describe('DialogPeopleAswerComponent', () => {
	let component: DialogPeopleAswerComponent;
	let fixture: ComponentFixture<DialogPeopleAswerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DialogPeopleAswerComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DialogPeopleAswerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
