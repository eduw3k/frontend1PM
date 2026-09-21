import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usuario = '';
  senha = '';

  constructor(private router: Router) {}

entrar(): void {
  if (this.usuario === 'admin' && this.senha === '1234') {
    Swal.fire({
      title: 'Login realizado!',
      text: 'Bem-vindo, administrador.',
      icon: 'success',
      confirmButtonText: 'Continuar'
    }).then(() => {
      this.router.navigate(['/admin']);
    });
  } else if (this.usuario === 'usuario' && this.senha === '1234') {
    Swal.fire({
      title: 'Login realizado!',
      text: 'Bem-vindo à Studium Personalizar.',
      icon: 'success',
      confirmButtonText: 'Continuar'
    }).then(() => {
      this.router.navigate(['/produtos']);
    });
  } else {
    Swal.fire({
      title: 'Login inválido!',
      text: 'Usuário ou senha incorretos.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}
}