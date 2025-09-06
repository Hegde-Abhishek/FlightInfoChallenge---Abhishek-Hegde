// import { Component } from '@angular/core';
// import { CommonModule, Location } from '@angular/common';
// import { Router } from '@angular/router';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';

// @Component({
//   standalone: true,
//   selector: 'app-done',
//   imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
//   template: `
//   <div class="page-shell">
//     <mat-card class="card" appearance="outlined" style="text-align:center">
//       <mat-card-content>
//         <span class="material-icons" style="font-size:48px;color:#2e7d32">check_circle</span>
//         <h2>All set!</h2>
//         <p>Your flight info was submitted successfully.</p>
//         <p *ngIf="data?.airline">
//         <strong>Airline:</strong> {{data.airline}} • <strong>Flight:</strong> {{data.flightNumber}}<br/>
//         <strong> Date & time: </strong> {{data.arrivalDate}} - {{data.arrivalTime}}
//         </p>
//         <div style="display:flex; gap:12px; justify-content:center; margin-top:16px">
//           <button mat-raised-button color="primary" (click)="again()">
//             Submit another
//           </button>
//           <button mat-stroked-button (click)="back()">Sign out</button>
//         </div>
//       </mat-card-content>
//     </mat-card>
//   </div>
//   `
// })
// export class DoneComponent {
//     data = history.state as { airline?: string; flightNumber?: string; arrivalDate?: Date; arrivalTime?: string; };
//   constructor(private router: Router, private location: Location) {}
//   again(){ this.router.navigate(['/flight']); }
//   back(){ this.router.navigate(['/login']) }
// }

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  standalone: true,
  selector: 'app-done',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
  <div class="done-shell">
    <div class="confetti" aria-hidden="true"></div>
    <mat-card class="card" appearance="outlined">
      <div class="success">
        <mat-icon color="primary">check_circle</mat-icon>
        <h2>All set!</h2>
        <p>Your flight info was submitted successfully.</p>
        <div *ngIf="data" class="grid">
          <div><strong>Airline:</strong> {{data.airline}}</div>
          <div><strong>Flight:</strong> {{data.flightNumber}}</div>
          <div *ngIf="data.arrivalDate"><strong>Date:</strong> {{data.arrivalDate}}</div>
          <div *ngIf="data.arrivalTime"><strong>Time:</strong> {{data.arrivalTime}}</div>
          <div *ngIf="data.numOfGuests"><strong>Guests:</strong> {{data.numOfGuests}}</div>
        </div>
        <div class="actions">
          <button mat-raised-button color="primary" (click)="again()">
            <span class="material-icons" style="font-size:18px;margin-right:6px;vertical-align:-4px">add</span>
            Submit another
          </button>
          <button mat-raised-button color="secondary" (click)="home()">Home</button>
        </div>
      </div>
    </mat-card>
  </div>
  `,
  styles: [`
    .done-shell{ min-height: calc(100dvh - 64px); display:grid; place-items:center; padding:24px; background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%); position:relative; overflow:hidden; }
    .card{ width:100%; max-width:720px; border-radius:20px; }
    .success{ text-align:center; padding: 20px 12px; animation: fadeUp .4s ease; }
    .success mat-icon{ font-size:56px; height:56px; width:56px; color:#2e7d32; animation: pop .35s ease; }
    .grid{ display:grid; gap:8px 16px; margin: 10px auto 0; max-width:480px; }
    .actions{ display:flex; gap:10px; justify-content:center; margin-top:16px; flex-wrap:wrap; }
    @keyframes fadeUp { from{opacity:0; transform:translateY(12px)} to{opacity:1; transform:none} }
    @keyframes pop { from{transform:scale(.7); opacity:0} to{transform:scale(1); opacity:1} }

    /* Confetti shimmer */
    .confetti{ position:absolute; inset:0; pointer-events:none; background:
      radial-gradient(2px 2px at 20% 10%, rgba(63,81,181,.35) 50%, transparent 51%),
      radial-gradient(2px 2px at 70% 20%, rgba(255,193,7,.45) 50%, transparent 51%),
      radial-gradient(2px 2px at 40% 80%, rgba(233,30,99,.35) 50%, transparent 51%),
      radial-gradient(2px 2px at 90% 60%, rgba(76,175,80,.35) 50%, transparent 51%);
      animation: drift 3s ease-in-out infinite alternate;
      opacity:.45;
    }
    @keyframes drift { from{transform:translateY(-8px)} to{transform:translateY(8px)} }
  `]
})
export class DoneComponent {
  router = inject(Router);
  auth = inject(Auth);
  data = history.state as any;

  again(){ this.router.navigate(['/flight']); }
  home(){ this.router.navigate(['/']); }
  async logout(){ await this.auth.signOut(); this.router.navigate(['/login']); }
  
}
