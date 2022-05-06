import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserLogin } from './user-login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  loginForm: FormGroup = new FormGroup({
    'username': new FormControl(null, Validators.required),
    'password': new FormControl(null, Validators.required)
  });
  errorMsg: string = '';

  ngOnInit(): void {
  }
  onLogin() {
    if(this.loginForm.valid) {
      const user = new UserLogin(this.loginForm.get('username')?.value,this.loginForm.get('password')?.value);
      this.authService.logIn(user);
    }
    this.loginForm.markAllAsTouched();
  }
  isLoading() {
    return this.authService.isLoading;
  }
  getFormControlClass(controlName: string) {
    const formControl = this.loginForm.get(controlName);
    if(!formControl?.touched) {
      return '';
    }
    if (formControl.valid && formControl.touched) {
      return 'is-valid';
    }
    return 'is-invalid';
  }
  getError() {
    const errorCode = this.authService.errorObj.errorCode;
    let errorMsg;
    if(errorCode === 8005) {
      errorMsg = 'Invalid username or password';
    } else if (errorCode !== -1) {
      errorMsg = this.authService.errorObj.errorMsg;
    } else {
      errorMsg = '';
    }
    this.errorMsg = errorMsg;
    return this.errorMsg;
  }
}
