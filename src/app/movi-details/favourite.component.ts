import { Component, OnInit, OnChanges } from '@angular/core';
import { MoviesService } from '../services/movies.service'; // flavien	
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-favourite',
  template: `

    <section >
      <div *ngIf="getList()" class="div">
      <h1 >You currently have no favourite movie</h1>
      <p class="empty">You can go back to the <a [routerLink]="['/home']">home page</a> and click on the heart icon on any movie to add it to this list.
      </div>
      <div *ngFor="let movie of favouriteMovies" class="container">
        <div class="image">
          <img [src]="setImage(movie)" [alt]="movie.title" height="400px" width="300px" [routerLink]="['/movie', movie.id]">
        </div>
        <div class="text">
          <p class="title">{{ movie.Title || movie?.title }}</p>
          <p class="year">Year:  {{ movie?.release_date || setDate(movie) }}</p>
          <button  (click)="onRemove(movie.id)" class="btn btn-primary">Remove</button>

        </div>
      </div>
    </section>
  `,
  styles: [`

    .login-section {
      text-align: center;
      margin-top: 80px;
    }

    .p {
      text-align: center;
      color: white;
      font-size: 3em;
      font-weight: bold;
    }

    .container {
      display: flex;
      flex-wrap: nowrap;
      margin-bottom: 30px;
      max-height: 500px;
      margin-left: 120px !important;
      margin-right: 0px !important;
      width: 100%;
    }


    img {
      margin-left: 0;
      cursor: pointer;
      transition: all 1s;
    }

    img:hover {
      transform: scale(1.1);
    }

    .text {
      padding-left: 50px;
      padding-right: 20px;
      background-color: black;
      width: 100%;
      margin-right: 0px !important;
    }
    .div {
      border: .5px solid red;
    }
    section {
      margin: 100px 2% !important;
      padding: 0 !important;
    }
    p {
      color: white;
    }
    .title {
      font-size: 2.5rem;
    }
    h1 {
      color: white;
      font-size: 4rem;
      text-align: center;
    }
    .empty {
      text-align: center;
    }

    @media screen and (max-width: 1336px) {
      .container {
        margin-left: 20px !important;
      }
    }

    @media screen and (max-width: 900px) {
      .container {
        display: block;
        margin-bottom: 100px;
      }
      .text {
        width: 300px;
        padding-bottom: 30px;
        padding-left: 20px;
      }
      .title {
        font-size: 1.4rem;
        text-overflow: ellipsis;
      }
      .year {
        font-size: .8rem;
      }
    }
  `]
})
export class FavouriteComponent implements OnInit {
  favouriteMovies: any;
  movie;
  imageUrl: string = "https://image.tmdb.org/t/p/original";
  constructor(private movieService: MoviesService, // flavien	
              public auth: AuthService) { }

  ngOnInit() {
    this.favouriteMovies = this.movieService.getFavourite();
  }


  setId() {
    if (this.movie.id) {
      return this.movie.id;
    }
    return this.movie.imdbID;
  }
  onRemove(id) {
    alert('Are you sure you want to want to remove this movie from your list?');
    this.movieService.removeFavourite(id);
    this.favouriteMovies = this.movieService.getFavourite();

  }

  getList() {
    if (this.favouriteMovies.length === 0) {
      return true;
    }
  }

  setImage(movie) {
    if (movie.poster_path) {
      return `${this.imageUrl}${movie.poster_path}`;
    }
    else {
      return movie.Poster;
    }
  }

  setDate(movie) {
    if (movie.release_date) {
      const date = movie.release_date.split("-");
      return date[0];
    }
  }
}
