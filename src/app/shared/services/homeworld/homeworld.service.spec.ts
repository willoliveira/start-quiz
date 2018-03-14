import { TestBed, inject } from '@angular/core/testing';

import { HomeworldService } from './homeworld.service';

describe('HomeworldService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [HomeworldService]
		});
	});

	it('should be created', inject([HomeworldService], (service: HomeworldService) => {
		expect(service).toBeTruthy();
	}));
});
