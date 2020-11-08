import { Component, OnInit } from '@angular/core';
import { faSearch, faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  { // flavien


  constructor(public auth: AuthService) { }

  ngOnInit() {

  }
}