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
import { ModalQuizFinishComponent } from './components/modal-quiz-finish/modal-quiz-finish.component';
import { StarshipService } from '../../shared/services/starship/starship.service';
import { VehicleService } from '../../shared/services/vehicle/vehicle.service';
import { SpecieService } from '../../shared/services/specie/specie.service';
import { HomeworldService } from '../../shared/services/homeworld/homeworld.service';

@NgModule({
	declarations: [
		GameComponent, TimerPipe,
		CardPeopleComponent, ModalPeopleDetailsComponent, DialogPeopleAswerComponent, TimerComponent, ModalQuizFinishComponent
	],
	entryComponents: [
		ModalPeopleDetailsComponent, DialogPeopleAswerComponent, TimerComponent, ModalQuizFinishComponent
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
		PeopleService, FilmService, StarshipService, VehicleService, SpecieService, HomeworldService
	]
})
export class GamePageModule { }
