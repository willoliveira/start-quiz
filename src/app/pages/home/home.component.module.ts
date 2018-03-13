import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material.module';

import { HomeComponent } from './home.component';

@NgModule({
	declarations: [
		HomeComponent
	],
	exports: [
		HomeComponent
	],
	imports: [
		RouterModule, MaterialModule, FlexLayoutModule
	]
})
export class HomePageModule { }
