import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface FlightInfoPayload {
  airline: string;
  arrivalDate: string;
  arrivalTime: string;
  flightNumber: string;
  numOfGuests: number;
  comments?: string;
}

@Injectable({ providedIn: 'root' })
export class FlightService {
  constructor(private http: HttpClient) {}

  buildPayload(v: any): FlightInfoPayload {
    return {
      airline: v.airline?.trim(),
      arrivalDate: v.arrivalDate,
      arrivalTime: v.arrivalTime,
      flightNumber: v.flightNumber?.trim(),
      numOfGuests: Number(v.numOfGuests),
      comments: v.comments?.trim() || undefined,
    };
  }

  async submit(payload: FlightInfoPayload): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': environment.api.token,
      'candidate': environment.api.candidate,
    });
    try {
      return await this.http.post(environment.api.endpoint, payload, { headers }).toPromise();
    } catch (err) {
      const e = err as HttpErrorResponse;
      throw new Error(e.error?.message || e.message || 'Network error');
    }
  }
}
