import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
	selector: 'app-modal-people-details',
	templateUrl: './modal-people-details.component.html',
	styleUrls: ['./modal-people-details.component.scss']
})
export class ModalPeopleDetailsComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<ModalPeopleDetailsComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit() {
	}

	getMap(data: Array<any>, key) {
		if (!data || !data.length) {
			return '';
		}
		return data.map(d => d[key]);
	}
}
