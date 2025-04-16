import { AuthService, UserService } from '../services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'register-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
  }>;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.nonNullable.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  showLogin() {
    this.router.navigate(['/']);
  }

  onRegisterSubmit() {
    if (this.form.invalid) return;

    const name = this.form.get('name')?.value ?? '';
    const email = this.form.get('email')?.value ?? '';
    const password = this.form.get('password')?.value ?? '';

    this.userService.register({ name, email, password }).subscribe({
      next: (res: any) => {
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.error = 'Register failed';
      }
    });
  }
}
