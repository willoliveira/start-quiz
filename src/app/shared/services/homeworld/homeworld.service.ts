import { Injectable } from '@angular/core';
import { Planet } from '../../models/planet.model';
import { HttpClient } from '@angular/common/http';
import { API_STARWARS_URL } from '../../utils/Config';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';

@Injectable()
export class HomeworldService {

	private _planets: Array<Planet> = [ ];

	constructor(private http: HttpClient) { }

	getPlanet(planetId): Observable<Planet> {
		const planet = this._planets.find(f => f.id === planetId);
		if (planet) {
			return Observable.of(planet);
		}
		return this.http
			.get<Planet>(`${API_STARWARS_URL}planets/${planetId}`)
			.pipe(
				tap((response: Planet) => {
					response.id = planetId;
					this._planets.push(response);
				})
			);
	}
}
