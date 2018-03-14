import { NgModule } from '@angular/core';
import { GameComponent } from './game.component';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardPeopleComponent } from './components/card-people/card-people.component';
import { CommonModule } from '@angular/common';
import { PeopleService } from '../../shared/services/people/people.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalPeopleDetailsComponent } from './components/modal-people-details/modal-people-details.component';
import { FilmService } from '../../shared/services/film/film.service';

@NgModule({
	declarations: [
		GameComponent,
		CardPeopleComponent,
		ModalPeopleDetailsComponent
	],
	entryComponents: [
		ModalPeopleDetailsComponent
	],
	exports: [
		GameComponent
	],
	imports: [
		CommonModule,
		MaterialModule, FlexLayoutModule,

		HttpClientModule
	],
	providers: [
		PeopleService, FilmService
	]
})
export class GamePageModule { }
