import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if(req.url !== 'http://localhost:8080/api/authenticate') {
            const modifiedRequest = req.clone({ 
                headers: req.headers.append('Authorization',
                `Bearer ${this.authService.accessToken}`)
            })
            return next.handle(modifiedRequest);
        }
        return next.handle(req);
    }
}