import { Planet } from './planet.model';
import { Film } from './film.model';
import { Starship } from './starship.model';
import { Vehicle } from './vehicle.model';
import { Specie } from './specie.model';

export interface People {
	id: number;
	name: string;
	height: number;
	mass: number;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: string;
	homeworld: Planet;
	films: Array<Film>;
	species: Array<Specie>;
	vehicles: Array<Vehicle>;
	starships: Array<Starship>;
	created: string;
	edited: string;
	url: string;
}
