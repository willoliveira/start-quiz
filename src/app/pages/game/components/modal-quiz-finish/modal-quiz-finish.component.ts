import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-modal-quiz-finish',
	templateUrl: './modal-quiz-finish.component.html',
	styleUrls: ['./modal-quiz-finish.component.scss']
})
export class ModalQuizFinishComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<ModalQuizFinishComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit(): void {
	}
}
