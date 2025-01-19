import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private baseUrl = 'http://localhost:8000/api/favorites';

  constructor(private http: HttpClient) {}

  // Add to favorites
  addFavorite(userId: string | null, recipeId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, { userId, recipeId });
  }

  // Remove from favorites
  removeFavorite(userId: string | null, recipeId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove`, {body: {userId, recipeId}});
  }

  // Get all favorites
  getFavorites(userId: string | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${userId}`);
  }
}
