import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { FlightService } from '../shared/flight.service';

const AIRLINES = ['Delta','United','American','JetBlue','Southwest','Alaska','Spirit','Frontier'];

@Component({
  standalone: true,
  selector: 'app-flight-form',
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatAutocompleteModule,
    MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatSnackBarModule,
    MatDividerModule, MatProgressSpinnerModule
  ],
  template: `
  <div class="page-shell">
    <mat-card class="card" appearance="outlined">
      <mat-card-header>
        <mat-card-title>Flight details</mat-card-title>
        <mat-card-subtitle>Provide your arrival info and guests</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <form [formGroup]="form" (ngSubmit)="submit()" class="grid-2" novalidate>
          <!-- Col 1 -->
          <div>
            <mat-form-field appearance="fill" class="w100">
              <mat-label>Airline</mat-label>
              <input matInput formControlName="airline" [matAutocomplete]="auto" required>
              <mat-autocomplete #auto="matAutocomplete">
                <mat-option *ngFor="let a of filteredAirlines()" [value]="a">{{a}}</mat-option>
              </mat-autocomplete>
              <mat-error *ngIf="form.controls.airline.invalid">Select or type a valid airline</mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="w100">
              <mat-label>Flight number</mat-label>
              <input matInput placeholder="DL1234" formControlName="flightNumber" required>
              <mat-error *ngIf="form.controls.flightNumber.invalid">Flight number required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="w100">
              <mat-label>Guests</mat-label>
              <input matInput type="number" min="1" formControlName="numOfGuests" required>
              <mat-error *ngIf="form.controls.numOfGuests.invalid">At least 1 guest</mat-error>
            </mat-form-field>
          </div>

          <!-- Col 2 -->
          <div>
            <mat-form-field appearance="fill" class="w100">
              <mat-label>Arrival date</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="arrivalDate" required>
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
              <mat-error *ngIf="form.controls.arrivalDate.invalid">Pick a date</mat-error>
            </mat-form-field>

            <div class="w100" style="display: flex; gap: 8px;">
            <mat-form-field appearance="fill" style="flex: 0 0 100px;">
                <mat-label>Hour</mat-label>
                <mat-select formControlName="hour">
                <mat-option *ngFor="let h of hours" [value]="h">{{ h }}</mat-option>
                </mat-select>
            </mat-form-field>

            <mat-form-field appearance="fill" style="flex: 0 0 100px;">
                <mat-label>Minute</mat-label>
                <mat-select formControlName="minute">
                <mat-option *ngFor="let m of minutes" [value]="m">{{ m }}</mat-option>
                </mat-select>
            </mat-form-field>

            <mat-form-field appearance="fill" style="flex: 0 0 100px;">
                <mat-label>AM/PM</mat-label>
                <mat-select formControlName="ampm">
                <mat-option value="AM">AM</mat-option>
                <mat-option value="PM">PM</mat-option>
                </mat-select>
            </mat-form-field>
            </div>

            <input type="hidden" formControlName="arrivalTime">

            <mat-form-field appearance="fill" class="w100">
              <mat-label>Comments (optional)</mat-label>
              <textarea matInput rows="3" maxlength="200" formControlName="comments"></textarea>
              <mat-hint align="end">{{ form.controls.comments.value?.length || 0 }} / 200</mat-hint>
            </mat-form-field>
          </div>
        </form>

        <mat-divider style="margin: var(--space-4) 0;"></mat-divider>

        <div class="footer-actions">
          <button mat-stroked-button (click)="copyPayload()" [disabled]="form.invalid">
          Copy JSON
          <span class="material-icons" style="font-size:18px;margin-right:6px">content_copy</span>
          </button>
          <button mat-raised-button color="primary" (click)="submit()" [disabled]="form.invalid || loading()">
            <mat-progress-spinner *ngIf="loading()" mode="indeterminate" diameter="18"></mat-progress-spinner>
            <span *ngIf="!loading()">Submit
            <span class="material-icons" style="font-size:18px;margin-right:6px;vertical-align:-4px">send</span>
            </span>
          </button>
        </div>

        <p *ngIf="error()" class="err" role="alert">{{ error() }}</p>
      </mat-card-content>
    </mat-card>
  </div>
  `,
  styles: [`
    .w100 { width: 100%; }
    .footer-actions { display:flex; gap: var(--space-3); justify-content: flex-end; align-items:center; }
    .err { color: #b00020; margin-top: var(--space-3); }
    mat-card-header { margin-bottom: var(--space-3); }
    mat-card-title { font-size: 1.25rem; }
  `]
})
export class FlightFormComponent {
  private fb = inject(FormBuilder);
  private svc = inject(FlightService);
  private router = inject(Router);
  private snack = inject(MatSnackBar);

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    airline: ['', Validators.required],
    arrivalDate: [null as Date | null, Validators.required],
    hour: ['', Validators.required],
    minute: ['', Validators.required],
    ampm: ['AM', Validators.required],
    arrivalTime: ['', Validators.required],
    flightNumber: ['', Validators.required],
    numOfGuests: [1, [Validators.required, Validators.min(1)]],
    comments: ['']
  });

  hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

    constructor() {
    this.form.valueChanges.subscribe(v => {
        const { hour, minute, ampm } = v;
        if (hour && minute && ampm) {
        const h = parseInt(hour, 10);
        const m = minute;
        let h24 = h % 12;
        if (ampm === 'PM') h24 += 12;
        const arrivalTime = `${String(h24).padStart(2, '0')}:${m}`;
        this.form.controls.arrivalTime.setValue(arrivalTime, { emitEvent: false });
        }
    });
    }

  filteredAirlines() {
    const q = (this.form.value.airline || '').toLowerCase();
    return AIRLINES.filter(a => a.toLowerCase().includes(q));
  }

  copyPayload() {
    const payload = this.svc.buildPayload(this.serialize());
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    this.snack.open('Payload copied', 'OK', { duration: 1500 });
  }

  serialize() {
    const v = this.form.value;
    return {
      ...v,
      arrivalDate: v.arrivalDate ? new Date(v.arrivalDate) : null, // Date object
    };
  }

  async submit() {
    this.error.set(null);
    if (this.form.invalid) {
      const first = Object.entries(this.form.controls).find(([_, c]) => c.invalid)?.[0];
      (document.querySelector(`[formcontrolname="${first}"]`) as HTMLElement)?.focus();
      return;
    }
    this.loading.set(true);
    try {
      const payload = this.svc.buildPayload({
        ...this.serialize(),
        // Convert date to ISO (server accepts any Date-parsable string)
        arrivalDate: (this.form.value.arrivalDate as Date).toISOString().slice(0,10), // YYYY-MM-DD
      });
      await this.svc.submit(payload);
      this.snack.open('Submitted successfully', 'OK', { duration: 1500 });
      this.router.navigate(['/done'], { state: payload});
    } catch (e:any) {
      this.error.set(e?.message || 'Submission failed. Please try again.');
      this.snack.open('Submission failed', 'Dismiss', { duration: 2500 });
    } finally {
      this.loading.set(false);
    }
  }
}
