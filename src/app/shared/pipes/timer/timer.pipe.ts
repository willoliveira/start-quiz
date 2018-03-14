import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'timer'
})
export class TimerPipe implements PipeTransform {

	private format: String = 'mm:s';

	transform(value: any, format?: String): any {

		this.checkFormat(format);
		// TODO: Fiz só um formato por enquanto, fazer um enum depois
		if (this.format === 'mm:s') {
			const mm = Math.floor(value / 60 / 1000);
			const s = Math.round( ( ( value / 60 / 1000) % 1 ) * 60 );
			if (mm > 9) {
				value = '' + mm;
			} else {
				value = '0' + mm;
			}

			if (s > 9) {
				value =  value + ':' + s;
			} else {
				value = value + ':0' + s;
			}
		}
		return value;
	}

	checkFormat(format: String) {
		if (format.match(/^0{2}:0{2}$/g)) {
			this.format = 'mm:s';
		} else if (format.match(/^0{2}:0{2}:0{3}$/g)) {
			this.format = 'mm:s:ms';
		} else {
			throw new Error('Invalid format timer pipe');
		}
	}
}
