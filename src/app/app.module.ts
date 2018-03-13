import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';

import { HomePageModule } from './pages/home/home.component.module';
import { GamePageModule } from './pages/game/game.component.module';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule, AppRoutingModule, BrowserAnimationsModule,

		MaterialModule,

		HomePageModule,
		GamePageModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
