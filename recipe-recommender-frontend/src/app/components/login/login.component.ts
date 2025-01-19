import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authForm: FormGroup;
  isRegister = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleAuthMode() {
    this.isRegister = !this.isRegister;
    if (!this.isRegister) {
      this.authForm.get('name')?.reset();
    }
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const { name, email, password } = this.authForm.value;

    if (this.isRegister) {
      const data = { name: name, email: email, password: password };
      this.userService.register(data).subscribe(() => {
        alert('Registration successful. Please log in.');
        this.toggleAuthMode();
      });
    } else {
      const data = { email: email, password: password };
      this.userService.login(data).subscribe((res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      });
    }
  }
}
