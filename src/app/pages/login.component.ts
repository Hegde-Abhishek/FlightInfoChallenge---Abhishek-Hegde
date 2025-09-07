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
            <input matInput [(ngModel)]="email" name="email" required email #emailCtrl="ngModel" autocomplete="username">
            <mat-error *ngIf="emailCtrl.errors?.['required']">Email is required</mat-error>
            <mat-error *ngIf="emailCtrl.errors?.['email']">Enter a valid email</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Password</mat-label>
            <input matInput type="password" [(ngModel)]="password" name="password" required #passwordCtrl="ngModel" autocomplete="current-password">
            <mat-error *ngIf="passwordCtrl.errors?.['required']">Enter a valid password</mat-error>
          </mat-form-field>

          <div class="actions">
            <button mat-raised-button color="primary" class="signin-btn">Sign in</button>
          </div>
        </form>

        <div style="display: flex; align-items: center; margin: 16px 0;">
            <mat-divider style="flex: 1;"></mat-divider>
            <span style="margin: 0 12px; white-space: nowrap;">or</span>
            <mat-divider style="flex: 1;"></mat-divider>
        </div>

         <div class="actions">
        <button class="google-signin-clean" (click)="loginGoogle()">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
            <span>Sign in with Google</span>
        </button>
        </div>
      </mat-card-content>
    </mat-card>
  </div>
  `,
  styles: [`
    .login-form { display: grid; gap: var(--space-4); margin-top: 20px; }
    .actions { display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        margin-top: 1rem;

        @media (min-width: 480px) {
            flex-direction: row;
            justify-content: center;
        }
    }
    .sep { margin: var(--space-4) 0; }
    .google-signin-clean {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 10px 24px;
        border-radius: 9999px;
        font-weight: 500;
        font-size: 15px;
        color: #3c4043;
        background-color: #fcffe2;
        border: 1px solid rgba(63, 81, 181, 0.2);
        box-shadow: 0 1px 3px rgba(60, 64, 67, 0.3), 0 4px 8px rgba(60, 64, 67, 0.15);
        cursor: pointer;
        transition: all 0.3s ease;

        img {
            width: 20px;
            height: 20px;
        }

        span {
            white-space: nowrap;
        }

        &:hover {
            background-color: #f7f8f8;
            box-shadow: 0 2px 6px rgba(60, 64, 67, 0.3), 0 6px 12px rgba(60, 64, 67, 0.15);
        }

        &:active {
            background-color: #eee;
            transform: scale(0.98);
        }

        &:focus {
            outline: 2px solid #4285f4;
            outline-offset: 2px;
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
