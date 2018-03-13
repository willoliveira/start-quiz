import { Injectable } from '@angular/core';
import { API_STARWARS_URL } from '../../utils/Config';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { People } from '../../models/people.model';

@Injectable()
export class PeopleService {

	_peoples: Array<People> = []; // TODO: cachear aqui depois

	constructor(private http: HttpClient) { }

	getPeople(peopleId):  Observable<People> {
		return this.http.get<People>(`${API_STARWARS_URL}people/${peopleId}`);
	}

	getPeoples(page: number = 1): Observable<Array<People>> {
		return this.http.get<Array<People>>(`${API_STARWARS_URL}people`);
	}
}
