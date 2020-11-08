import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { last } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: IUser;
  loginUser(firstName:string, email: string, password: string) {
    this.currentUser = {
      id: 3,
      firstName: firstName,
      lastName: 'Abiola',
      userName: 'deji_abiola',
      email: email
    };

  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }
  constructor() { }
}
