import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
            // return this.authService.loggedIn.pipe(map((e: boolean) => {
            //     if (e) {
            //         return true;
            //     }
            //     this.router.navigate(['/login']);
            //     return false;
            // }));
            if(this.authService.loggedIn) {
                return true;
            } else {
                this.router.navigate(["/login"]);
                return false;
            }
        }
}