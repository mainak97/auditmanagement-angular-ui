import { Component, OnInit, Input } from '@angular/core';
import { MainErrorService } from '../main/main-error.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private mainErrorService: MainErrorService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  getErrorMsg(): string {
    return this.mainErrorService.errorObj.errorMsg;
  }

  hideModal(): void {
    this.mainErrorService.setErrorObj({ errorCode: 0, errorMsg: '' });
  }

  closeModal(): void {
    if(this.mainErrorService.errorObj.errorCode === 8005) {
      this.authService.logOut();
    }
    this.hideModal();
  }
}
