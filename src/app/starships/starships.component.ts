import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StarshipService } from '../_services/starship.service';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css'],
})
export class StarshipsComponent implements OnInit {
  naus: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private starshipService: StarshipService
  ) {}

  ngOnInit() {
    this.http
      .get('https://swapi.dev/api/starships')
      .subscribe((response: any) => {
        this.naus = response.results.map((nau: any, index: number) => ({
          ...nau,
          id: index + 1,
        }));
      });
    this.loadStarships();
  }

  loadStarships() {
    this.starshipService.getStarships().subscribe(
      (response) => {
        this.naus = this.naus.concat(response.results);
      },
      (error) => {
        console.error('Error al carregar les naus:', error);
      }
    );
  }

  verDetalles(nau: any) {
    this.router.navigate(['/fitxa'], { state: { starship: nau } });
  }
}
