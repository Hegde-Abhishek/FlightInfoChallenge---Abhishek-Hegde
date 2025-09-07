import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, CommonModule],
  template: `
    <mat-toolbar color="primary">
      <span class="material-icons" style="margin-right:8px">flight</span>
      <span class="title">Flight Info Challenge</span>
      <span class="spacer"></span>
      <button mat-button (click)="logout()" *ngIf="auth.currentUser" class="signout-btn" matTooltip="Sign out">
        <mat-icon>logout</mat-icon>
        Sign out
      </button>
    </mat-toolbar>
  `,
  styles: [`.title{font-weight:500}.spacer{flex:1}
    .signout-btn {
        transition: background-color 0.3s ease, color 0.3s ease;
        border-radius: 9999px;
        padding: 0 24px;
    }

    .signout-btn:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: #fff;
    }
  `]
})
export class HeaderComponent {
  constructor(public auth: Auth, private router: Router){}
  async logout(){ await this.auth.signOut(); this.router.navigate(['/login']); }
}
