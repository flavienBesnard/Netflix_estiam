import {  OnInit, Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { SingleMovie, Video } from '../models/movie';

@Component({
  templateUrl: './movi-details.component.html',
  styleUrls: ['./movi-details.component.css']
})

export class MoviDetailsComponent implements OnInit {

  movie: SingleMovie;
  // added
  video: Video;
  imageBaseUrl = 'https://image.tmdb.org/t/p/original';

  constructor( private movieService: MoviesService, private route: ActivatedRoute) { }

  ngOnInit() {
    const movieId: number = +this.route.snapshot.params.id;
    this.movieService.getMovie(movieId).subscribe(res => this.movie = res);
    // added
    this.movieService.getVideo(movieId).subscribe(res => this.video = res);
  }
}