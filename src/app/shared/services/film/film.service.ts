import { Injectable } from '@angular/core';
import { Film } from '../../models/film.model';
import { HttpClient } from '@angular/common/http';
import { API_STARWARS_URL } from '../../utils/Config';

import { map, expand, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';

@Injectable()
export class FilmService {

	private _films: Array<Film> = [ ];

	constructor(private http: HttpClient) { }

	/**
	 * @see 'https://stackoverflow.com/questions/40529232/angular-2-http-observables-and-recursive-requests'
	 * @param filmIds
	 */
	getFilms(filmIds: Array<string>) {
		// tslint:disable-next-line:prefer-const
		let index = 0;
		const get = (): Observable<any> => {
			return this.getFilm(filmIds[index]);
		};

		return get().pipe(
			expand((res) => {
				index += 1;
				if (index === filmIds.length) {
					return Observable.empty();
				}
				return get();
			})
		);
	}

	getFilm(filmId): Observable<Film> {
		const film = this._films.find(f => f.id === filmId);
		if (film) {
			return Observable.of(film);
		}
		return this.http
			.get<Film>(`${API_STARWARS_URL}films/${filmId}`)
			.pipe(
				tap((response: Film) => {
					response.id = filmId;
					this._films.push(response);
				})
			);
	}
}
