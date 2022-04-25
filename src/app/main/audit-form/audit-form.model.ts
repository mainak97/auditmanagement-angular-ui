import { AuditDetail } from './audit-detail.model';

export class Audit {
    constructor(public projectName: string, public projectManagerName: string,
        public applicationOwnerName: string, public auditDetails: AuditDetail) {}
}