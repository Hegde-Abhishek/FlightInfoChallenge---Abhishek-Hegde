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
      <h1>Flight Information</h1>
      <p>Sign in, share your arrival details, and you’re done in under a minute (I promise!)</p>
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
    .cta {
    font-size: 1.1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 999px;
    box-shadow: 0 4px 10px rgba(63, 81, 181, 0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(63, 81, 181, 0.3);
    }

    .steps{ max-width: 980px; margin: 24px auto 48px; display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; padding: 0 16px; }
    .step{ display:grid;grid-template-rows:auto auto 1fr;align-items:start;justify-items:center;text-align:center;padding:18px;border-radius:16px;box-shadow:0 4px 14px rgba(0,0,0,.06);background:#fff }
    .step mat-icon{ font-size:32px; height:32px; width:32px; color:#3949ab; }
    .step h3{ margin: 8px 0 6px; }
    .step p{ margin: 0; opacity:.8 }
    @media(max-width: 900px){ .steps{ grid-template-columns: 1fr; } }
    .step:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
    border: 1px solid #3f51b5;
    }
  `]
})
export class LandingComponent {
  user = signal<any>(null);
  constructor(){
    onAuthStateChanged(inject(Auth), u => this.user.set(u));
  }
}
