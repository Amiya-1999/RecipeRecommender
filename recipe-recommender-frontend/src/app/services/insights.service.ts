import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsightsService {
  private apiUrl = 'http://localhost:8000/api/insights';

  constructor(private http: HttpClient) {}

  getAllQuickStats(userId: string | null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
}
