import { Component, OnInit, ViewChild } from '@angular/core';
import { People } from '../../shared/models/people.model';
import { PeopleService } from '../../shared/services/people/people.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ModalPeopleDetailsComponent } from './components/modal-people-details/modal-people-details.component';
import { FilmService } from '../../shared/services/film/film.service';
import { DialogPeopleAswerComponent } from './components/dialog-people-aswer/dialog-people-aswer.component';
import { TimerComponent } from './components/timer/timer.component';
import { Subscription } from 'rxjs/Subscription';
import { ModalQuizFinishComponent } from './components/modal-quiz-finish/modal-quiz-finish.component';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_KEY_SWQ } from '../../shared/utils/Config';
import { Film } from '../../shared/models/film.model';
import { Vehicle } from '../../shared/models/vehicle.model';
import { Starship } from '../../shared/models/starship.model';
import { Specie } from '../../shared/models/specie.model';
import { VehicleService } from '../../shared/services/vehicle/vehicle.service';
import { StarshipService } from '../../shared/services/starship/starship.service';
import { SpecieService } from '../../shared/services/specie/specie.service';
import { HomeworldService } from '../../shared/services/homeworld/homeworld.service';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

	@ViewChild('timer') timerInstance: TimerComponent;

	private countPeoples = 0;
	private page = 1;
	private SwPeoples: Array<People> = [ ];
	private isLoading: Boolean = true;

	private points: Array<{
		people: People,
		score: {
			point?: number, consulted?: boolean, disabled?: boolean
		}
	}> = [];

	private dialogPeopleDetailtRef: MatDialogRef<ModalPeopleDetailsComponent>;
	private dialogPeopleAswertRef: MatDialogRef<DialogPeopleAswerComponent>;
	private modalQuizFinishRef: MatDialogRef<ModalQuizFinishComponent>;

	constructor(
		private router: Router,
		private peopleService: PeopleService,
		private filmService: FilmService,
		private vehicleService: VehicleService,
		private starshipService: StarshipService,
		private speciesService: SpecieService,
		private planetService: HomeworldService,
		private dialog: MatDialog
	) { }

	ngOnInit() {
		this.getPeoples().add(() => {
			this.timerInstance.start();
		});
	}

	onChangePage(event) {
		if (!this.timerInstance.isPaused()) {
			this.timerInstance.pause();
		}

		this.page = event.pageIndex + 1;
		this.getPeoples();
	}

	onClickDetail(data: any) {
		this.isLoading = true;
		this.timerInstance.pause();
		this.getAllFilms(data)
			.then((films: any) => { data.films = <any> films; })
			.then(this.getAllVehicles.bind(this, data))
			.then((vehicles) => { data.vehicles = <any> vehicles; })
			.then(this.getAllStarships.bind(this, data))
			.then((starships) => { data.starships = <any> starships; })
			.then(this.getAllSpecies.bind(this, data))
			.then((species) => { data.species = <any> species; })
			.then(this.getPlanet.bind(this, data))
			.then((homeworld) => { data.homeworld = <any> homeworld; })
			.then(this.onFinishLoadDetails.bind(this, data));
	}

	getPlanet(data: People) {
		let specie;
		const homeworld = data.homeworld;
		if (typeof homeworld === 'string') {
			const str: string = <any> data.homeworld;
			const splited = str.split('/');
			specie = splited[splited.length - 2];
		} else {
			specie = data.homeworld.id;
		}
		return new Promise((resolve, reject) => {
			this.planetService.getPlanet(specie).subscribe(resolve);
		});
	}

	getAllFilms(data: People) {
		if (!data.films || !data.films.length) {
			return Promise.resolve({});
		}
		const films = data.films.map((film: any) => {
			if (typeof film === 'string') {
				const splited = film.split('/');
				return splited[splited.length - 2];
			} else {
				return film['id'];
			}
		});
		return new Promise((resolve, reject) => {
			// tslint:disable-next-line:prefer-const
			let indexFilms = 0;
			const arrFilms: Array<Film> = [];
			this.filmService.getFilms(films).subscribe((film: Film) => {
				indexFilms += 1;
				arrFilms.push(film);

				if (indexFilms === films.length) {
					data.films = arrFilms;
					resolve(arrFilms);
				}
			});
		});
	}

	getAllVehicles(data: People) {
		if (!data.vehicles || !data.vehicles.length) {
			return Promise.resolve({});
		}
		const vehicles = data.vehicles.map((vehicle: any) => {
			if (typeof vehicle === 'string') {
				const splited = vehicle.split('/');
				return splited[splited.length - 2];
			} else {
				return vehicle['id'];
			}
		});
		return new Promise((resolve, reject) => {
			// tslint:disable-next-line:prefer-const
			let indexVehicle = 0;
			const arrVehicle: Array<Vehicle> = [];
			this.vehicleService.getVehicles(vehicles).subscribe((vehicle: Vehicle) => {
				indexVehicle += 1;
				arrVehicle.push(vehicle);

				if (indexVehicle === vehicles.length) {
					data.vehicles = arrVehicle;
					resolve(arrVehicle);
				}
			});
		});
	}

	getAllStarships(data: People) {
		if (!data.starships || !data.starships.length) {
			return Promise.resolve({});
		}
		const starships = data.starships.map((starship: any) => {
			if (typeof starship === 'string') {
				const splited = starship.split('/');
				return splited[splited.length - 2];
			} else {
				return starship['id'];
			}
		});
		return new Promise((resolve, reject) => {
			// tslint:disable-next-line:prefer-const
			let indexStarship = 0;
			const arrStarship: Array<Starship> = [];
			this.starshipService.getStarships(starships).subscribe((starship: Starship) => {
				indexStarship += 1;
				arrStarship.push(starship);

				if (indexStarship === starships.length) {
					data.starships = arrStarship;
					resolve(arrStarship);
				}
			});
		});
	}

	getAllSpecies(data: People) {
		if (!data.species || !data.species.length) {
			return Promise.resolve({});
		}
		const species = data.species.map((specie: any) => {
			if (typeof specie === 'string') {
				const splited = specie.split('/');
				return splited[splited.length - 2];
			} else {
				return specie['id'];
			}
		});
		return new Promise((resolve, reject) => {
			// tslint:disable-next-line:prefer-const
			let indexSpecie = 0;
			const arrSpecie: Array<Specie> = [];
			this.speciesService.getSpecies(species).subscribe((specie: Specie) => {
				indexSpecie += 1;
				arrSpecie.push(specie);

				if (indexSpecie === species.length) {
					data.species = arrSpecie;
					resolve(arrSpecie);
				}
			});
		});
	}

	onFinishLoadDetails(data: People) {
		this.isLoading = false;
		this.timerInstance.resume();
		this.dialogPeopleDetailtRef = this.dialog.open(ModalPeopleDetailsComponent, {
			minWidth: '500px', data
		});
		this.dialogPeopleDetailtRef.afterClosed().subscribe(() => {
			this.setTouchPeople(data);
		});
	}

	onClickAnswer(data: People) {
		this.dialogPeopleAswertRef = this.dialog.open(DialogPeopleAswerComponent, {
			data: { people: data, return: '' }
		});
		this.dialogPeopleAswertRef.afterClosed().subscribe((result: string) => {
			if (result) {
				if (result.toLocaleLowerCase() === data.name.toLocaleLowerCase()) {
					this.setScore(data);
				} else {
					this.setDisablePeople(data);
				}
			}
		});
	}

	onStartTimer() {
		console.log('onStartTimer');
	}

	onFinishTimer() {
		console.log('onFinishTimer');
		const score = this.sumPoints();

		this.modalQuizFinishRef = this.dialog.open(ModalQuizFinishComponent, {
			data: {
				score,
				entity: { user: '', email: '' }
			}
		});

		this.modalQuizFinishRef.afterClosed()
			.subscribe((result: { user: string, email: string }) => {
				let usersLocalStorage;
				let usersParsed: Array<{ user: string, email: string, score?: number  }>;
				let user: { user?: string, email?: string, score?: number };

				if (result) {
					usersLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY_SWQ);
					if (usersLocalStorage) {
						usersParsed = JSON.parse(usersLocalStorage);
						user = usersParsed.find(u => u.email === result.email);
						if (user) {
							if (user.score < score) {
								const index = usersParsed.map(u => u.email).indexOf(user.email);
								usersParsed[index] = { ...result, score };
							}
						} else {
							usersParsed.push({ ...result, score });
						}
						localStorage.setItem(LOCAL_STORAGE_KEY_SWQ, JSON.stringify(usersParsed));
					} else {
						localStorage.setItem(LOCAL_STORAGE_KEY_SWQ, JSON.stringify([{ ...result, score }]));
					}
				}

				this.router.navigate(['/home']);
			});
	}

	// TODO: Ficou feio, tentar refazer isso depois
	setTouchPeople(people: People) {
		const peoplePoint = this.points.find(p => p.people.name === people.name);
		if (peoplePoint) {
			peoplePoint.score.consulted = true;
		} else {
			this.points.push({
				people,
				score: { consulted: true }
			});
		}
	}

	setDisablePeople(people: People) {
		const peoplePoint = this.points.find(p => p.people.name === people.name);
		if (peoplePoint) {
			peoplePoint.score.disabled = true;
		} else {
			this.points.push({
				people,
				score: { disabled: true }
			});
		}
	}

	setScore(people: People) {
		const peoplePoint = this.points.find(p => p.people.name === people.name);
		if (peoplePoint) {
			peoplePoint.score.point = peoplePoint.score.consulted ? 5 : 10;
		} else {
			this.points.push({
				people,
				score: { point: 10 }
			});
		}
	}

	getPeoples(): Subscription {
		this.isLoading = true;
		return this.peopleService.getPeoples(this.page)
			.subscribe((response) => {
				this.countPeoples = response['count'];
				this.SwPeoples = response['results'];

				this.isLoading = false;

				if (this.timerInstance.isPaused()) {
					this.timerInstance.resume();
				}
			});
	}

	getStatusCard(people: People): String {
		const peoplePoint = this.points.find(p => p.people.name === people.name);
		if (peoplePoint) {
			if (peoplePoint.score.point) {
				if (peoplePoint.score.point === 10) {
					return 'success';
				} else if (peoplePoint.score.point === 5) {
					return 'success-half';
				}
			}
			if (peoplePoint.score.disabled) {
				return 'error';
			}
		}
		return 'none';
	}

	sumPoints(): number {
		return this.points
			.map(point => point.score.point ? point.score.point : 0 )
			.reduce((beforePoint, currentPoint) => beforePoint + currentPoint, 0);
	}

}
