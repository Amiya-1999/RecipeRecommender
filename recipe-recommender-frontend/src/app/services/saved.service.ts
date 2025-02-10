import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SavedService {
  private baseUrl = 'http://localhost:8000/api/saved';

  constructor(private http: HttpClient) {}

  // Add to savedRecipes
  addSavedRecipe(
    userId: string | null,
    recipeId: string | undefined
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, { userId, recipeId });
  }

  // Remove from savedRecipes
  deleteSavedRecipe(userId: string | null, recipeId: string | undefined): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove`, {
      body: { userId, recipeId },
    });
  }

  // Get all saved recipes by user
  getSavedRecipesByUser(userId: string | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${userId}`);
  }
}
