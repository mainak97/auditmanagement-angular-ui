export class AuditDetails {
    constructor(
        public id: number,
        public projectName: string,
        public projectManagerName: string,
        public applicationOwnerName: string,
        public auditType: string,
        public auditDate: Date,
        public auditQuestionsYes: number,
        public auditQuestionsNo: number,
        public projectExecutionStatus: string,
        public remedialAction: string
    ) {}
}