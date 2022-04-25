import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Audit } from './audit-form.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AuditFormApi {
    constructor(private http: HttpClient) {}

    getAuditQuestions(auditType: string) {
        return this.http.get('http://localhost:8080/api/auditchecklistquestions',{ 
            headers: new HttpHeaders({
                'audit-type': ''
            })
        });
    }

    postAuditForm(auditForm: Audit) {
        const formattedAuditForm = {
            ...auditForm,
            auditDetails: undefined,
            auditDetail: {
                auditType: auditForm.auditDetails.auditType,
                auditDate: new Date(auditForm.auditDetails.auditDate).toISOString(),
                auditQuestionsYes: auditForm.auditDetails.auditQuestions.reduce((count,ans) => ans==="true"? count+1:count, 0),
                auditQuestionsNo: auditForm.auditDetails.auditQuestions.reduce((count,ans) => ans==="false"? count+1:count, 0)
            }
        };
        return this.http.post('http://localhost:8080/api/projectexecutionstatus',formattedAuditForm);
    }
};