import { NgModule } from '@angular/core';
import {
	MatToolbarModule,
	MatIconModule,
	MatButtonModule,
	MatCardModule,
	MatGridListModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatDialogModule,
	MatFormFieldModule,
	MatInputModule
} from '@angular/material';

@NgModule({
	imports: [
		MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule,
		MatIconModule, MatGridListModule, MatPaginatorModule,
		MatProgressBarModule, MatDialogModule, MatFormFieldModule, MatInputModule
	],
	exports: [
		MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule,
		MatIconModule, MatGridListModule, MatPaginatorModule,
		MatProgressBarModule, MatDialogModule, MatFormFieldModule, MatInputModule
	]
})
export class MaterialModule { }
