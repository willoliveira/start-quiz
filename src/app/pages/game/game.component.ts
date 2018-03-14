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

	onClickDetail(data: People) {
		const films = data.films.map((film: any) => {
			const splited = <string> film.split('/');
			return splited[splited.length - 2];
		});

		// this.filmService.getFilms(films).subscribe(top => {
		// 	console.log(top);
		// });

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
		this.modalQuizFinishRef = this.dialog.open(ModalQuizFinishComponent, {});
		this.modalQuizFinishRef.afterClosed()
			.subscribe((result: string) => {
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
		console.log(this.points);
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
		console.log(this.points);
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
		console.log(this.points);
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

}
