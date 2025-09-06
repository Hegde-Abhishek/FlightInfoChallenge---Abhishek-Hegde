// import { Component, inject, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterLink } from '@angular/router';
// import { Auth, onAuthStateChanged } from '@angular/fire/auth';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   standalone: true,
//   selector: 'app-landing',
//   imports: [CommonModule, RouterLink, MatButtonModule],
//   template: `
//   <section class="hero">
//     <h1>Flight Info Challenge</h1>
//     <p>Authenticate to submit your flight details.</p>
//     <a *ngIf="!user()" routerLink="/login" mat-raised-button color="primary">Sign in</a>
//     <a *ngIf="user()" routerLink="/flight" mat-raised-button color="primary">Open form</a>
//   </section>
//   `,
//   styles: [`.hero{max-width:720px;margin:80px auto;text-align:center;display:grid;gap:12px}`]
// })
// export class LandingComponent {
//   user = signal<any>(null);
//   constructor(){
//     const auth = inject(Auth);
//     onAuthStateChanged(auth, u => this.user.set(u));
//   }
// }

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-landing',
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MatCardModule],
  template: `
  <section class="hero">
    <div class="hero-inner">
      <h1>Flight Info Challenge</h1>
      <p>Sign in, share your arrival details, and you’re done in under a minute.</p>
      <a *ngIf="!user()" routerLink="/login" mat-raised-button color="primary" class="cta">Get started</a>
      <a *ngIf="user()" routerLink="/flight" mat-raised-button color="primary" class="cta">Open form</a>
    </div>
  </section>

  <section class="steps">
    <mat-card class="step">
      <mat-icon>login</mat-icon>
      <h3>1. Authenticate</h3>
      <p>Use email/password or Google to access the form.</p>
    </mat-card>

    <mat-card class="step">
      <mat-icon>event</mat-icon>
      <h3>2. Enter details</h3>
      <p>Airline, flight, guests, date, time and any comments (if needed).</p>
    </mat-card>

    <mat-card class="step">
      <mat-icon>send</mat-icon>
      <h3>3. Submit</h3>
      <p>We validate, post to the API, and confirm success with a receipt.</p>
    </mat-card>
  </section>
  `,
  styles: [`
    .hero{
      background: radial-gradient(1200px 500px at 50% -100px, #e8ebf9 0%, transparent 70%),
                  linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
      padding: 56px 24px 8px;
      text-align:center;
    }
    .hero-inner{ max-width: 860px; margin: 0 auto; }
    .hero h1{ font-size: 2.2rem; margin: 0 0 8px; }
    .hero p{ opacity:.8; margin: 0 0 20px; }
    .cta{ border-radius: 9999px; padding: 10px 22px; font-weight:600; }

    .steps{ max-width: 980px; margin: 24px auto 48px; display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; padding: 0 16px; }
    .step{ text-align:center; padding: 18px 18px; border-radius: 16px; }
    .step mat-icon{ font-size:32px; height:32px; width:32px; color:#3949ab; }
    .step h3{ margin: 8px 0 6px; }
    .step p{ margin: 0; opacity:.8 }
    @media(max-width: 900px){ .steps{ grid-template-columns: 1fr; } }
  `]
})
export class LandingComponent {
  user = signal<any>(null);
  constructor(){
    onAuthStateChanged(inject(Auth), u => this.user.set(u));
  }
}
