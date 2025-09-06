// import { Component, signal } from '@angular/core';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   standalone: true,
//   selector: 'app-header',
//   imports: [MatToolbarModule, MatIconModule, MatButtonModule],
//   template: `
//     <mat-toolbar color="primary">
//       <span class="material-icons" style="margin-right:8px">flight</span>
//       <span class="title">Flight Info Challenge</span>
//       <span class="spacer"></span>
//       <!-- (optional) dark toggle later -->
//       <!-- <button mat-icon-button aria-label="Toggle dark theme">
//         <span class="material-icons">dark_mode</span>
//       </button> -->
//     </mat-toolbar>
//   `,
//   styles: [`
//     .title { font-weight: 500; }
//     .spacer { flex: 1 1 auto; }
//   `]
// })
// export class HeaderComponent {}

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
      <button mat-button (click)="logout()" *ngIf="auth.currentUser">Sign out</button>
    </mat-toolbar>
  `,
  styles: [`.title{font-weight:500}.spacer{flex:1}`]
})
export class HeaderComponent {
  constructor(public auth: Auth, private router: Router){}
  async logout(){ await this.auth.signOut(); this.router.navigate(['/login']); }
}
