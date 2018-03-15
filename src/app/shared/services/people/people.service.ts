import { Injectable } from '@angular/core';
import { API_STARWARS_URL } from '../../utils/Config';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import { People } from '../../models/people.model';


@Injectable()
export class PeopleService {

	private _peoples: Array<People> = []; // TODO: cachear aqui depois
	// cachear depois
	private setCachePeoples(page) { }
	private hasPage(page: number, pageSize: number) { }
	private getPage(page: number, pageSize: number) { }

	constructor(private http: HttpClient) { }

	getPeople(peopleId): Observable<People> {
		return this.http.get<People>(`${API_STARWARS_URL}people/${peopleId}`);
	}

	getPeoples(page: number = 1, pageSize: number = 10) {
		// if (this.hasPage(page, pageSize)) {
		// 	return this.getPage(page, pageSize);
		// }
		return this.http.get(`${API_STARWARS_URL}people?page=${page}`)
		.pipe(
			map((response: any) => {
				response.results.forEach((element: any) => {
					const splited = element.url.split('/');
					const id = splited[splited.length - 2];
					element.id = id.trim();
				});
				return response;
			})
		);
	}

	getImage(name) {
		return this.http.get(`https://pixabay.com/api/?key=2779220-fc18bd9ac9619ced4a7c773fc&q=${name}`);
	}
}
