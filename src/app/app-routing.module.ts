import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MoviDetailsComponent } from './movi-details/movi-details.component';
import { MovieResolverService } from './services/movie-resolver.service';
import { Err404Component } from './err404/err404.component';
import { FavouriteComponent } from './movi-details/favourite.component';
import { ProfileComponent } from './user/profile.component';

const routes: Routes = [
  {path: 'home', component: MovieListComponent, resolve: {resolvedMovies: MovieResolverService}},
  {path: '404', component: Err404Component},
  {path: 'home/:id', component: MoviDetailsComponent},
  {path: 'movies/favourite', component: FavouriteComponent},
  {path: 'user', loadChildren: './user/user.module#UserModule'},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
