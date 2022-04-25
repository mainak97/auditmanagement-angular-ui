import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from './user-login.model';

@Injectable()
export class LoginApi {
    constructor(private http: HttpClient) {}

    postLoginDetails(userDetails: UserLogin) {
        return this.http.post('http://localhost:8080/api/authenticate',userDetails);
    }

};