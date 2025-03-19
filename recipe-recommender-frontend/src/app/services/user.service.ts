import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8000/api/users';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  private userId = new BehaviorSubject<string | null>(this.hasUserId());

  constructor(private http: HttpClient) {}

  // Check if user is logged in
  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getUserId(): Observable<string | null> {
    return this.userId.asObservable();
  }

  updateUser(user: any): Observable<any> {
    const updatedUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    return this.http.put<any>(`${this.baseUrl}/update/${user.id}`, updatedUser);
  }

  resetPassword(data: {email: string, password: string}): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/reset/password`, data);
  }

  userDetails(userId: string | null): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`);
  }

  deleteUser(userId: string | null): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/remove/${userId}`).pipe(
      tap((res) => {
        this.logout();
      })
    );
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
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.user.id);
        this.isLoggedInSubject.next(true);
        this.userId.next(response.user.id);
      })
    );
  }

  // Logout user
  logout(): void {
    localStorage.clear();
    this.isLoggedInSubject.next(false);
    this.userId.next('');
  }

  private hasUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Check for token in localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
