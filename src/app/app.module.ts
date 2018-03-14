import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

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
		CommonModule, BrowserModule, AppRoutingModule,

		BrowserAnimationsModule, FlexLayoutModule, MaterialModule,

		HomePageModule,
		GamePageModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
