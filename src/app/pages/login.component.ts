import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule],
  template: `
  <div class="page-shell">
    <mat-card class="card" appearance="outlined">
      <mat-card-header>
        <mat-card-title>Sign in</mat-card-title>
        <mat-card-subtitle>Authenticate to submit your flight details</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <form (ngSubmit)="loginEmail()" class="login-form">
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="email" name="email" required autocomplete="username">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Password</mat-label>
            <input matInput type="password" [(ngModel)]="password" name="password" required autocomplete="current-password">
          </mat-form-field>

          <div class="actions">
            <button mat-raised-button color="primary">Sign in</button>
          </div>
        </form>

        <mat-divider class="sep"></mat-divider>

        <button mat-stroked-button (click)="loginGoogle()" class="gbtn">
          <span class="material-icons" style="margin-right:8px">login</span>
          Sign in with Google
        </button>
      </mat-card-content>
    </mat-card>
  </div>
  `,
  styles: [`
    .login-form { display: grid; gap: var(--space-4); }
    .actions { display: flex; justify-content: flex-end; }
    .sep { margin: var(--space-4) 0; }
    .gbtn { width: 100%; }
  `]
})
export class LoginComponent {
  email = ''; password = '';
  constructor(private auth: AuthService, private router: Router) {}
  async loginEmail(){ try{ await this.auth.loginEmail(this.email,this.password); this.router.navigate(['/flight']); } catch(e:any){ alert(e.message || 'Login failed'); } }
  async loginGoogle(){ try{ await this.auth.loginGoogle(); this.router.navigate(['/flight']); } catch(e:any){ alert(e.message || 'Login failed'); } }
}
