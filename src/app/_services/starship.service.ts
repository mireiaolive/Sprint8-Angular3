import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StarshipService {
  private baseUrl = 'https://swapi.dev/api/starships';
  private nextPage = 2; // Començar a la pàgina 2, ja que la pàgina 1 ja ha estat carregada  constructor(private http: HttpClient) {}

  constructor(private http: HttpClient) {}

  getStarshipImageUrl(starshipId: string): string {
    return `https://starwars-visualguide.com/assets/img/starships/${starshipId}.jpg`;
  }

  getCharacterImageUrl(pilotId: string): string {
    return `https://starwars-visualguide.com/assets/img/characters/${pilotId}.jpg`;
  }

  getStarships(): Observable<any> {
    const url = `${this.baseUrl}/?page=${this.nextPage}`;
    this.nextPage++;
    return this.http.get<any>(url);
  }
}
