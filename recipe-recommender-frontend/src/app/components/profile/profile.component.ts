import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user!: User;
  userId: string | null = '';
  loading: boolean = true;
  isEditing: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserId().subscribe((res) => {
      this.userId = res;
    });
    this.userService.userDetails(this.userId).subscribe((res) => {
      this.user = res.user;
      this.loading = false;
    });
  }

  updateUser(): void {
    alert('User details updated successfully!');
    // Logic to update user details (e.g., via an API call)
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    alert('User details updated successfully!');
    this.isEditing = false;
    // Add logic to save the updated user details
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.userService.deleteUser(this.userId).subscribe(() => {});
      this.router.navigate(['/']);
      alert("Account deleted successfully!");
    }
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}

interface User {
  id: number,
  name: string,
  email: string, 
  password: string,
  created_at: string
}
