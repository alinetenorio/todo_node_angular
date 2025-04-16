import { AuthService, UserService } from '../services';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  showRegister() {
    this.router.navigateByUrl('/register');
  }

  onLoginSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.getRawValue();

    this.authService.login({ email, password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/task']);
      },
      error: (err: any) => {
        this.error = 'Login failed';
      }
    });
  }
}
