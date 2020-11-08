import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-profile',
  template: `
  <body>
  <div class="container">
    <h1>Edit Your Profile </h1>
    <hr>
    <div class="col-md-4">
      <form autocomplete="off" [formGroup]="profileForm" (ngSubmit)="saveProfile(profileForm.value)">
        <div class="form-group" [ngClass]="{'error': !validateFirstName()}">
          <label for="firstName">First Name:</label>
          <em *ngIf="!validateFirstName() && profileForm.controls.firstName?.errors.required">Required</em>
          <em *ngIf="!validateFirstName() && profileForm.controls.firstName?.errors.pattern">Firstname must start with a letter</em>
          <input  formControlName="firstName" id="firstName" type="text" class="form-control" placeholder="First Name..." />
        </div>
        <div class="form-group" [ngClass]="{'error': !validateLastName()}">
          <label for="lastName">Last Name:</label>
          <em *ngIf="!validateLastName()">Required</em>
          <input  formControlName="lastName" id="lastName" type="text" class="form-control" placeholder="Last Name..." />
        </div>

        <button type="submit" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-default" >Cancel</button>
      </form>
    </div>
  </div>
  </body>

  `,
  styles: [`
  body {
    background-color: grey;
    background-image: none;
    height: 100vh;
  }

  .btn-primary {
    background-color: orange;
    border: none;
    border-radius: 0px;
  }
  input {
    border-radius: 0px;
  }
  .container {
    margin-top: 80px;
    margin-left: 20px;
  }
  em{float:right;color:red;padding-left:10px}
    .error input{background-color: #e3c3c5}
    .error ::webkit-input-placeholder {color:#999}

`]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;


  constructor(private auth: AuthService, private router: Router ) {}

  ngOnInit() {
    this.firstName = new FormControl(this.auth.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl(this.auth.currentUser.lastName, Validators.required);
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  saveProfile(formValues): void {
    if (this.profileForm.valid){
      this.auth.updateCurrentUser(formValues.firstName, formValues.lastName);
      this.router.navigate(['home'])
    }
  }

  cancel() {
    this.router.navigate(['home']);
  }

  validateLastName() {
    return this.lastName.valid || this.lastName.untouched;
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched;
  }

}
