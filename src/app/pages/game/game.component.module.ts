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
import { TimerComponent } from './components/timer/timer.component';
import { DialogPeopleAswerComponent } from './components/dialog-people-aswer/dialog-people-aswer.component';
import { FormsModule } from '@angular/forms';
import { TimerPipe } from '../../shared/pipes/timer/timer.pipe';

@NgModule({
	declarations: [
		GameComponent, TimerPipe,
		CardPeopleComponent, ModalPeopleDetailsComponent, DialogPeopleAswerComponent, TimerComponent
	],
	entryComponents: [
		ModalPeopleDetailsComponent, DialogPeopleAswerComponent, TimerComponent
	],
	exports: [
		GameComponent
	],
	imports: [
		CommonModule, FormsModule,
		MaterialModule, FlexLayoutModule,

		HttpClientModule
	],
	providers: [
		PeopleService, FilmService
	]
})
export class GamePageModule { }
