import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8000/api/users';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  userId: string | null = this.hasUserId();

  constructor(private http: HttpClient, private storageService: StorageService) {}

  // Check if user is logged in
  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  // Register user
  register(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // Login user
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap((response: any) => {
        this.storageService.setItem('token', response.token);
        this.storageService.setItem('userId', response.user.id);
        this.isLoggedInSubject.next(true);
        this.userId = response.user.id;
      })
    );
  }

  // Logout user
  logout(): void {
    this.storageService.removeItem('token');
    this.storageService.removeItem('userId');
    this.isLoggedInSubject.next(false);
  }

  private hasUserId(): string | null {
    return this.storageService.getItem('userId');
  }

  // Check for token in localStorage
  private hasToken(): boolean {
    return !!this.storageService.getItem('token');
  }
}
