import { Component, OnInit, Input } from '@angular/core';
import { AuditDetails } from './audit-details.model';

@Component({
  selector: 'app-audit-details',
  templateUrl: './audit-details.component.html',
  styleUrls: ['./audit-details.component.css']
})
export class AuditDetailsComponent implements OnInit {

  @Input() auditResult: AuditDetails = new AuditDetails(
    0,'','','','',new Date(),0,0,'',''
  );
  constructor() { }

  ngOnInit(): void {
  }

}
