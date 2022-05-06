import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import apiUrl from '../api.config.json';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if(req.url !== apiUrl.getJwtUrl) {
            const modifiedRequest = req.clone({ 
                headers: req.headers.append('Authorization',
                `Bearer ${this.authService.accessToken}`)
            })
            return next.handle(modifiedRequest);
        }
        return next.handle(req);
    }
}