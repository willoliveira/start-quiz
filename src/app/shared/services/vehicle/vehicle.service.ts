import { Injectable } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { HttpClient } from '@angular/common/http';
import { API_STARWARS_URL } from '../../utils/Config';

import { map, expand, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';

@Injectable()
export class VehicleService {

	private _vehicles: Array<Vehicle> = [ ];

	constructor(private http: HttpClient) { }

	getVehicles(vehicleIds: Array<string>) {
		// tslint:disable-next-line:prefer-const
		let index = 0;
		const get = (): Observable<any> => {
			return this.getVehicle(vehicleIds[index]);
		};

		return get().pipe(
			expand((res) => {
				index += 1;
				if (index === vehicleIds.length) {
					return Observable.empty();
				}
				return get();
			})
		);
	}

	getVehicle(vehicleId): Observable<Vehicle> {
		const vehicle = this._vehicles.find(v => v.id === vehicleId);
		if (vehicle) {
			return Observable.of(vehicle);
		}
		return this.http
			.get<Vehicle>(`${API_STARWARS_URL}vehicles/${vehicleId}`)
			.pipe(
				tap((response: Vehicle) => {
					response.id = vehicleId;
					this._vehicles.push(response);
				})
			);
	}
}
