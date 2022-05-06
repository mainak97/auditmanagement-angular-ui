import { LoginApi } from './login/login-api.service';
import { Injectable } from '@angular/core';
import { UserLogin } from './login/user-login.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    isLoading = false;
    accessToken = '';
    expiresAt = new Date();
    username = '';
    loggedIn = false;
    errorObj = {
        errorCode: -1,
        errorMsg: ''
    };

    constructor(private loginApi: LoginApi, private router: Router) {}
    
    logIn(user : UserLogin) {
        this.isLoading = true;
        return this.loginApi.postLoginDetails(user).subscribe((response: any) => {
            this.accessToken = response['accessToken'];
            this.username = response['username'];
            this.expiresAt = new Date(response['expiresAt']);
            this.loggedIn = true;
            this.isLoading = false;
            this.errorObj = {
                errorCode: -1,
                errorMsg: ''
            };
            this.router.navigate(["/"]);
            localStorage.setItem('userData',
            JSON.stringify({
                accessToken: this.accessToken,
                username: this.username,
                expiresAt: this.expiresAt.toString()
            }));
        },(error: any) => {
            this.loggedIn = false;
            this.isLoading = false;
            if(error.error.errorMsg) {
                this.errorObj = error.error;
            } else {
                this.errorObj = {
                    errorCode: 0,
                    errorMsg: 'An unknown error has occurred.'
                };
            }
        });
    }
    
    logOut() {
        this.accessToken = '';
        this.username = '';
        this.loggedIn = false;
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
    }

    autoLogin() {
        const userData = localStorage.getItem('userData');
        if(!userData) {
            return;
        }
        const userDataObj = JSON.parse(userData);
        const expiresAtTemp = new Date(userDataObj.expiresAt);
        if(expiresAtTemp > new Date()) {
            this.accessToken = userDataObj.accessToken;
            this.username = userDataObj.username;
            this.expiresAt = new Date(userDataObj.expiresAt);
            this.loggedIn = true;
            this.router.navigate(["/"]);
        }
    }
};