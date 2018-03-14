import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPeopleDetailsComponent } from './modal-people-details.component';

describe('ModalPeopleDetailsComponent', () => {
	let component: ModalPeopleDetailsComponent;
	let fixture: ComponentFixture<ModalPeopleDetailsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ModalPeopleDetailsComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalPeopleDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
