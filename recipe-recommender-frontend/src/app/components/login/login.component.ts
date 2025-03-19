import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authForm: FormGroup;
  isRegister = false;
  isPasswordForgot: boolean = false;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  toggleAuthMode() {
    this.isRegister = !this.isRegister;
    if (!this.isRegister) {
      this.authForm.get('name')?.reset();
    }
    else {
      this.isPasswordForgot = false;
    }
  }

  onSubmit() {
    const { name, email, password } = this.authForm.value;

    if (this.isRegister) {
      const data = { name: name, email: email, password: password };
      this.userService.register(data).subscribe({
        next: () => {
          alert('Registration successful. Please log in.');
          this.toggleAuthMode();
        },
        error: (err) => {
          alert(err.error.message || 'Something went wrong');
        },
      });
    } else {
      const data = { email: email, password: password };
      if (this.isPasswordForgot) {
        this.userService.resetPassword(data).subscribe({
          next: (res) => {
            alert(res.message)
            this.isPasswordForgot = false;
          },
          error: (err) => {
            alert(err.error?.message || "Something went wrong")
          }
        });
      } else {
        this.userService.login(data).subscribe({
          next: (res) => {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/']);
          },
          error: (err) => {
            alert(err.error?.message || 'Invalid crediential');
          },
        });
      }
    }
  }
}
