import { NgModule } from '@angular/core';
import {
	MatToolbarModule,
	MatIconModule,
	MatButtonModule,
	MatCardModule,
	MatGridListModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatDialogModule
} from '@angular/material';

@NgModule({
	imports: [
		MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule,
		MatIconModule, MatGridListModule, MatPaginatorModule,
		MatProgressBarModule, MatDialogModule
	],
	exports: [
		MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule,
		MatIconModule, MatGridListModule, MatPaginatorModule,
		MatProgressBarModule, MatDialogModule
	]
})
export class MaterialModule { }
