import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from './user-login.model';
import apiUrl from '../../api.config.json';

@Injectable()
export class LoginApi {
    constructor(private http: HttpClient) {}

    postLoginDetails(userDetails: UserLogin) {
        return this.http.post(apiUrl.getJwtUrl,userDetails);
    }

};