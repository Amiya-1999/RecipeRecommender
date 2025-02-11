import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewService {
  private baseUrl = 'http://localhost:8000/api/view';

  constructor(private http: HttpClient) {}

  // Add to views
  addView(
    userId: string | null,
    recipeId: string | undefined
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, { userId, recipeId }).pipe(
      catchError((error) => {
        if (error.status === 400) {
          console.log('View already exists. No action needed.');
          return of(null);
        }
        throw error;
      })
    );
  }

  // Get all recipes viewed by user
  getRecipesViewedByUser(userId: string | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${userId}`);
  }
}
