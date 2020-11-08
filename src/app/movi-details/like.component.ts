import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../services/movies.service'; // flavien	
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-like',
  template: `
  <span (click)="logClick()">
    <button *ngIf="!woLike()" class="btn btn-outline-secondary">Like</button>
    <button   *ngIf="woLike()"  class="btn btn-danger" size="lg">Unlike</button>

  </span>
  `,
  styles: [`
  button {
    cursor: pointer;
    transition: all 1s;
    transform-origin: 50% 50%;
    font-family: "times new roman",'Oswald', sans-serif;
    width: 80px;
    height: 35px;
    margin-top: 3px;
    padding: 3px;
  }
  .btn-danger:hover {
    transform: scale(1.1);
    background-color: #DC3545;
    color: white;
  }

  .btn-outline-danger:hover {
    transform: scale(1.1);
    background-color: white;
    color: #DC3545;
  }
  .
  `]
})


export class LikeComponent implements OnInit {
  faHeart = faHeart;
  solidHeart = solidHeart;
  liked: boolean = false;
  @Input() movieId: string;
  @Input() movieLiked: boolean;
  favourites;
  movie;
  constructor(private movieService: MoviesService) {
   }

  ngOnInit() {
    this.favourites = this.movieService.getFavourite();
    }

  logClick() {
    this.liked = !this.liked;
    if (this.liked === true) {
      this.movieService.addFavourite(this.movieId);
    } else {
      this.movieService.removeFavourite(this.movieId);
    }
  }

  woLike() {
    if (this.movieLiked === false) {
      return false;
    } else if (this.liked === true || this.movieLiked === true) {
      return true;
    }
  }




}
