import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = 'http://localhost:8000/api/recipes';

  constructor(private http: HttpClient) {}

  getAllRecipes(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get(`${this.apiUrl}`, { params });
  }

  getRecipeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  searchRecipes(ingredients: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, { ingredients });
  }
}
