import { Injectable } from '@angular/core';

@Injectable()
export class MainErrorService {
    errorObj = {
        errorCode: 0,
        errorMsg: ''
    };
    setErrorObj(errorObj: { errorCode: number, errorMsg: string }) : void {
        if(errorObj.errorCode === 8005) {
            this.errorObj = { ...errorObj, errorMsg: 'Your session has expired. Please log in again.' };
        } else {
            this.errorObj = { ...errorObj };
        }
    };
};