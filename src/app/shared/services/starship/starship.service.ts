import { Injectable } from '@angular/core';
import { Starship } from '../../models/starship.model';
import { HttpClient } from '@angular/common/http';
import { API_STARWARS_URL } from '../../utils/Config';

import { map, expand, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';

@Injectable()
export class StarshipService {

	private _starships: Array<Starship> = [ ];

	constructor(private http: HttpClient) { }

	getStarships(starshipIds: Array<string>) {
		// tslint:disable-next-line:prefer-const
		let index = 0;
		const get = (): Observable<any> => {
			return this.getStarship(starshipIds[index]);
		};

		return get().pipe(
			expand((res) => {
				index += 1;
				if (index === starshipIds.length) {
					return Observable.empty();
				}
				return get();
			})
		);
	}

	getStarship(starshipId): Observable<Starship> {
		const starship = this._starships.find(s => s.id === starshipId);
		if (starship) {
			return Observable.of(starship);
		}
		return this.http
			.get<Starship>(`${API_STARWARS_URL}starships/${starshipId}`)
			.pipe(
				tap((response: Starship) => {
					response.id = starshipId;
					this._starships.push(response);
				})
			);
	}

}
