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
          <mat-form-field appearance="fill">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="email" name="email" required autocomplete="username">
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Password</mat-label>
            <input matInput type="password" [(ngModel)]="password" name="password" required autocomplete="current-password">
          </mat-form-field>

          <div class="actions">
            <button mat-raised-button color="primary" class="signin-btn">Sign in</button>
          </div>
        </form>

        <mat-divider class="sep"></mat-divider>

        <button mat-stroked-button (click)="loginGoogle()" class="gbtn">
            <span class="material-icons gicon">login</span>
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
    .gbtn {
  background: linear-gradient(135deg, #4285F4, #34A853);
  color: white;
  font-weight: 600;
  text-transform: none;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;

  .gicon {
    margin-right: 12px;
    transition: transform 0.3s ease;
    font-size: 22px;
  }

  &:hover {
    background: linear-gradient(135deg, #3367D6, #5e82e4ff);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);

    .gicon {
      transform: rotate(10deg) scale(1.2);
    }
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
}

  `]
})
export class LoginComponent {
  email = ''; password = '';
  constructor(private auth: AuthService, private router: Router) {}
  async loginEmail(){ try{ await this.auth.loginEmail(this.email,this.password); this.router.navigate(['/flight']); } catch(e:any){ alert(e.message || 'Login failed'); } }
  async loginGoogle(){ try{ await this.auth.loginGoogle(); this.router.navigate(['/flight']); } catch(e:any){ alert(e.message || 'Login failed'); } }
}
