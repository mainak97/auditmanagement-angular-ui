import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuditFormApi } from './audit-form/audit-form-api.service';
import { Audit } from './audit-form/audit-form.model';
import { AuditDetails } from './audit-details/audit-details.model';
import { MainErrorService } from './main-error.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  auditResult: any = {};
  constructor(private auditFormApi: AuditFormApi, private mainErrorService: MainErrorService) { }

  ngOnInit(): void {
  }
  submitForm = (audit: Audit) => {
      this.auditFormApi.postAuditForm(audit).subscribe(
        (response: any) => {
          this.auditResult = new AuditDetails(
            response.id, response.projectName, response.projectManagerName,
            response.applicationOwnerName, response.auditType,
            new Date(response.auditDate), response.auditQuestionsYes,
            response.auditQuestionsNo, response.projectExecutionStatus,
            response.remedialAction
          );
          window.scrollTo(0,document.body.scrollHeight);
        },
        (error: any) => {
          this.mainErrorService.setErrorObj(error.error);
        }
      );
  }
  getAuditResultId() {
    return this.auditResult.id;
  }
  getErrorMsg() {
    return this.mainErrorService.errorObj.errorMsg;
  }
}
