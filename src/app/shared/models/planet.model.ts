export interface Planet {
	name: string,
	rotation_period: number,
	orbital_period: number,
	diameter: number,
	climate: string //arid,
	gravity: string,
	terrain: string,
	surface_water: number,
	population: number,
	residents: Array<string>,
	films: Array<string>,
	created: string,
	edited: string,
	url: string
}
