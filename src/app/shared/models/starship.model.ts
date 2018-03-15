export interface Starship {
	id: number;
	name: string;
	model: string;
	manufacturer: string;
	cost_in_credits: number;
	length: number;
	max_atmosphering_speed: number;
	crew: number;
	passengers: number;
	cargo_capacity: number;
	consumables: string;
	hyperdrive_rating: number;
	MGLT: number;
	starship_class: number;
	pilots: Array<string>;
	films: Array<string>;
	created: string;
	edited: string;
	url: string;
}
