import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQuizFinishComponent } from './modal-quiz-finish.component';

describe('ModalQuizFinishComponent', () => {
	let component: ModalQuizFinishComponent;
	let fixture: ComponentFixture<ModalQuizFinishComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ModalQuizFinishComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalQuizFinishComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
