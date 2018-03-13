import { People } from "./people.model";
import { Film } from "./film.model";

export interface Specie {
	"name": string;
	"classification": string;
	"designation": string;
	"average_height": string;
	"skin_colors": string;
	"hair_colors": string;
	"eye_colors": string;
	"average_lifespan": string;
	"homeworld": string;
	"language": string;
	"people": Array<People>;
	"films": Array<Film>;
	"created": string;
	"edited": string;
	"url": string;
}
