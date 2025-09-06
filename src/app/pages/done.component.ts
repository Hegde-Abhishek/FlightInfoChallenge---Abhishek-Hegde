import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-done',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
  <div class="page-shell">
    <mat-card class="card" appearance="outlined" style="text-align:center">
      <mat-card-content>
        <span class="material-icons" style="font-size:48px;color:#2e7d32">check_circle</span>
        <h2>All set!</h2>
        <p>Your flight info was submitted successfully.</p>
        <p *ngIf="data?.airline">
        <strong>Airline:</strong> {{data.airline}} • <strong>Flight:</strong> {{data.flightNumber}}
        </p>
        <div style="display:flex; gap:12px; justify-content:center; margin-top:16px">
          <button mat-raised-button color="primary" (click)="again()">
            Submit another
          </button>
          <button mat-stroked-button (click)="back()">Sign out</button>
        </div>
      </mat-card-content>
    </mat-card>
  </div>
  `
})
export class DoneComponent {
    data = history.state as { airline?: string; flightNumber?: string };
  constructor(private router: Router, private location: Location) {}
  again(){ this.router.navigate(['/flight']); }
  back(){ this.router.navigate(['/login']) }
}
