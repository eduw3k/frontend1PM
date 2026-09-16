import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MdbRippleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  usuario = '';
  senha = '';

  constructor(private router: Router) {}

  entrar(): void {
    this.router.navigate(['/drones']);
  }
}