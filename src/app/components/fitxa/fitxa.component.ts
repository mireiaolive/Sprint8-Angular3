import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StarshipService } from '../../_services/starship.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-fitxa',
  templateUrl: './fitxa.component.html',
  styleUrls: ['./fitxa.component.css'],
})
export class FitxaComponent implements OnInit {
  nau: any;
  imageUrl: string = '';
  imageError: boolean = false;
  pilotImages: string[] = [];
  errorImageUrl: string =
    'https://images.unsplash.com/photo-1623018035782-b269248df916?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';

  films: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private starshipService: StarshipService,
    private router: Router
  ) {}

  ngOnInit() {
    const state = history.state;
    if (state && state.starship) {
      this.nau = state.starship;
      const starshipId = this.nau.url.split('/').filter(Boolean).pop();
      this.imageUrl = this.starshipService.getStarshipImageUrl(starshipId);
      console.log(this.imageUrl);
    }

    if (this.nau.pilots.length > 0) {
      this.pilotImages = this.nau.pilots.map((pilotUrl: string) => {
        const pilotId = pilotUrl.split('/').filter(Boolean).pop();
        if (pilotId) {
          return this.starshipService.getCharacterImageUrl(pilotId);
        }
        return '';
      });
    }
    this.getFilmDetails();
  }

  onImageError() {
    this.imageError = true;
  }

  getFilmDetails() {
    const filmRequests: Observable<any>[] = this.nau.films.map(
      (filmUrl: string) => this.starshipService.getFilmDetails(filmUrl)
    );

    forkJoin(filmRequests).subscribe((films: any[]) => {
      this.films = films.map((film: any) => {
        const filmId = film.url.split('/').filter(Boolean).pop();
        return {
          ...film,
          imageUrl: this.starshipService.getFilmImageUrl(filmId),
        };
      });
    });
  }
}
