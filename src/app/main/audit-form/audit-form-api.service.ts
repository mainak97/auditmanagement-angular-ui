import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Audit } from './audit-form.model';
import { Injectable } from '@angular/core';
import apiUrl from '../../../api.config.json';

@Injectable()
export class AuditFormApi {
    constructor(private http: HttpClient) {}

    getAuditQuestions(auditType: string) {
        return this.http.get(apiUrl.checklistQuestionsUrl,{ 
            headers: new HttpHeaders({
                'audit-type': auditType
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
        return this.http.post(apiUrl.projectExecutionUrl,formattedAuditForm);
    }
};