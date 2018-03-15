import { Injectable } from '@angular/core';
import { Specie } from '../../models/specie.model';
import { HttpClient } from '@angular/common/http';
import { API_STARWARS_URL } from '../../utils/Config';

import { map, expand, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';

@Injectable()
export class SpecieService {

	private _species: Array<Specie> = [ ];

	constructor(private http: HttpClient) { }

	getSpecies(specieIds: Array<string>) {
		// tslint:disable-next-line:prefer-const
		let index = 0;
		const get = (): Observable<any> => {
			return this.getSpecie(specieIds[index]);
		};

		return get().pipe(
			expand((res) => {
				index += 1;
				if (index === specieIds.length) {
					return Observable.empty();
				}
				return get();
			})
		);
	}

	getSpecie(specieId): Observable<Specie> {
		const specie = this._species.find(s => s.id === specieId);
		if (specie) {
			return Observable.of(specie);
		}
		return this.http
			.get<Specie>(`${API_STARWARS_URL}species/${specieId}`)
			.pipe(
				tap((response: Specie) => {
					response.id = specieId;
					this._species.push(response);
				})
			);
	}

}
