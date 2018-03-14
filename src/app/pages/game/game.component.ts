import { Component, OnInit } from '@angular/core';
import { People } from '../../shared/models/people.model';
import { PeopleService } from '../../shared/services/people/people.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ModalPeopleDetailsComponent } from './components/modal-people-details/modal-people-details.component';
import { FilmService } from '../../shared/services/film/film.service';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

	private countPeoples = 0;
	private page = 1;
	private SwPeoples: Array<People> = [ ];
	private isLoading: Boolean = true;

	private dialogPeopleDetailtRef: MatDialogRef<ModalPeopleDetailsComponent>;

	constructor(
		private peopleService: PeopleService,
		private filmService: FilmService,
		private dialog: MatDialog
	) { }

	ngOnInit() {
		this.getPeoples();
	}

	onChangePage(event) {
		this.page = event.pageIndex + 1;
		this.getPeoples();
	}

	onClickDetail(data: People) {
		const films = data.films.map((film: any) => {
			const splited = <string> film.split('/');
			return splited[splited.length - 2];
		});

		console.log(films);

		this.filmService.getFilms(films).subscribe(top => {
			console.log(top);
		});

		this.dialogPeopleDetailtRef = this.dialog.open(ModalPeopleDetailsComponent, {
			minWidth: '500px', data
		});
		this.dialogPeopleDetailtRef.afterClosed().subscribe(() => {
		});
	}

	onClickAnswer(data: People) {
		console.log('onClickAnswer', data);
	}

	getPeopleDetail() {
		return new Promise((resolve, reject) => {

		});
	}

	getPeoples() {
		this.isLoading = true;
		this.peopleService.getPeoples(this.page).subscribe((response) => {
			this.countPeoples = response['count'];
			this.SwPeoples = response['results'];

			this.isLoading = false;
		});
	}

}
