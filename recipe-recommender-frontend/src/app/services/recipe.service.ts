import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './structure';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = 'http://localhost:8000/api/recipes';

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getRecipeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  searchRecipes(ingredients: string[], type: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, { ingredients, type });
  }

  addRecipes(recipe: Recipe, userId: string | null): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/${userId}`, recipe);
  }

  getRecipesByUser(userId: string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  getAllIngredient(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ingredients`);
  }
}
