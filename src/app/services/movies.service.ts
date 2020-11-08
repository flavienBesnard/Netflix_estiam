import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service'; // flavien	

import { MovieDbResponse, SingleMovie, Movie } from '../models/movie';
import { Router } from '@angular/router';


@Injectable()

export class MoviesService {
  private apiKey = '?api_key=d01149a7f4a54d4c74dd3e40994ea043';
  private apiUrl = 'https://api.themoviedb.org/3/movie';
  private searchUrl = 'https://api.themoviedb.org/3/search/movie';
  STORAGE_KEY = 'local_favourites';// flavien	
  currentFavouriteMovies;// flavien	
  favouriteMovie;// flavien	

  constructor(private http: HttpClient, private router: Router,@Inject(LOCAL_STORAGE) private storage: StorageService) { // flavien	
   }

  // get movie collection
  getMovies(): Observable<Movie[]> {
    return this.http.get<MovieDbResponse>(`${this.apiUrl}/popular${this.apiKey}`)
      .pipe(
        map(res => {
          return res.results;
        }),
        catchError(this.handleError<Movie[]>('getMovies', [] ))
      );
  }

  // get single movie
  getMovie(id): Observable<SingleMovie> { // flavien	
    return this.http.get<SingleMovie>(`${this.apiUrl}/${id}${this.apiKey}`)
      .pipe(
        catchError(this.handleError<SingleMovie>(`getMovie id=${id}`))
    );
  }

  // get movies whose name contain search term
  searchMovie(term: string): Observable<Movie[]> {
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<MovieDbResponse>(`${this.searchUrl}${this.apiKey}&query=${term}`)
      .pipe(
        map(res => {
         return res.results;
        }),
    catchError(this.handleError<Movie[]>('getMovies', []))
  );
  }

  // handle http error
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      this.router.navigate(['/404'], {skipLocationChange:true});
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  addFavourite(id: string){ // flavien	
    this.currentFavouriteMovies = this.storage.get(this.STORAGE_KEY) || [];
    const film = this.currentFavouriteMovies.find(movie => movie.id === id);
    if (film && film.liked === true) {
      return;
    } else {
      this.getMovie(id).subscribe({
        next: movie => {
          this.favouriteMovie = movie;

          this.currentFavouriteMovies.push(movie);
          this.storage.set(this.STORAGE_KEY, this.currentFavouriteMovies);
          console.log(this.storage.get(this.STORAGE_KEY) || 'LocaL storage is empty');
        }
      });
    }
  }
  
   removeFavourite(id: string) { // flavien	
    this.currentFavouriteMovies = this.storage.get(this.STORAGE_KEY);
    const film = this.currentFavouriteMovies.find(movie => movie.id === id);
    this.currentFavouriteMovies = this.currentFavouriteMovies.filter(movie => movie.id !== id);
    this.storage.set(this.STORAGE_KEY, this.currentFavouriteMovies);
  }


  getFavourite() { // flavien	
    return this.storage.get(this.STORAGE_KEY) || [];
  }

}
