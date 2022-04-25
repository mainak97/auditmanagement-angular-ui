import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditQuestionComponent } from './audit-question.component';

describe('AuditQuestionComponent', () => {
  let component: AuditQuestionComponent;
  let fixture: ComponentFixture<AuditQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
