import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-landing',
  imports: [CommonModule, RouterLink, MatButtonModule],
  template: `
  <section class="hero">
    <h1>Flight Info Challenge</h1>
    <p>Authenticate to submit your flight details.</p>
    <a *ngIf="!user()" routerLink="/login" mat-raised-button color="primary">Sign in</a>
    <a *ngIf="user()" routerLink="/flight" mat-raised-button color="primary">Open form</a>
  </section>
  `,
  styles: [`.hero{max-width:720px;margin:80px auto;text-align:center;display:grid;gap:12px}`]
})
export class LandingComponent {
  user = signal<any>(null);
  constructor(){
    const auth = inject(Auth);
    onAuthStateChanged(auth, u => this.user.set(u));
  }
}
