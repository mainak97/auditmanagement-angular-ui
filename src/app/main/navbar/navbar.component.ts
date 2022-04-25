import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.username;
  }
  onLogOut() {
    this.authService.logOut();
  }
}
