import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Sign In</h5>
            <form class="form-signin" #loginForm= "ngForm" (ngSubmit)="login(loginForm.value)" ngNativeValidate>
              <div class="form-label-group">
                <em *ngIf="loginForm.controls.firstName?.invalid && loginForm.controls.firstName?.touched">Required</em>
                <input required (ngModel)="firstName" name="firstName" type="text" id="inputEmail" class="form-control" placeholder="First name" required>
                <label for="inputEmail"></label>
                </div>
              <div class="form-label-group">
                <em *ngIf="loginForm.controls.email?.invalid && loginForm.controls.email?.touched">Required</em>
                <input required (ngModel)="email" name="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required>
                <label for="inputEmail"></label>
              </div>

              <div class="form-label-group">
                <em *ngIf="loginForm.controls.password?.invalid && loginForm.controls.password?.touched">Required</em>
                <input required (ngModel)="password" name="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                <label for="inputPassword"></label>
              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">Remember password</label>
              </div>
              <button [disabled]="loginForm.invalid" class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
              <button type="button" class="btn btn-outline-secondary btn-block text-uppercase" (click)='cancel()'>Cancel</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  `,
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  firstName: string;
  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(formValues) {
    this.authService.loginUser(formValues.firstName, formValues.email, formValues.password);
    this.router.navigate(['home']);
  }

  cancel() {
    this.router.navigate(['home']);
  }


}
