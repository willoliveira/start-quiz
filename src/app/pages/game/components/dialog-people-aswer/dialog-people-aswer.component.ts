import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-dialog-people-aswer',
	templateUrl: './dialog-people-aswer.component.html',
	styleUrls: ['./dialog-people-aswer.component.scss']
})
export class DialogPeopleAswerComponent implements OnInit {

	name: string;

	constructor(
		public dialogRef: MatDialogRef<DialogPeopleAswerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit() {
	}

}
