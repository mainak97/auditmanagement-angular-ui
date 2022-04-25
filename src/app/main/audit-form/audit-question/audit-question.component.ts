import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-audit-question',
  templateUrl: './audit-question.component.html',
  styleUrls: ['./audit-question.component.css']
})
export class AuditQuestionComponent implements OnInit {
  @Input() question: { id: number, question: string } = { id: 0, question: ''};
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() index: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
