import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuditFormApi } from './audit-form-api.service';
import { Audit } from './audit-form.model';
import { MainErrorService } from '../main-error.service';

@Component({
  selector: 'app-audit-form',
  templateUrl: './audit-form.component.html',
  styleUrls: ['./audit-form.component.css']
})
export class AuditFormComponent implements OnInit {
  questions: { id: number, question: string }[] = []
  auditTypes: { label: string, value: string }[] = [{ label: 'Internal', value: 'Internal' }];
  auditForm: FormGroup = new FormGroup({
    'projectName': new FormControl(null, Validators.required),
    'projectManagerName': new FormControl(null, Validators.required),
    'applicationOwnerName': new FormControl(null, Validators.required),
    'auditDetails': new FormGroup({
      'auditDate': new FormControl(null, [Validators.required]),
      'auditType': new FormControl("default", [Validators.required,this.auditTypeValidator.bind(this)]),
      'auditQuestions': new FormArray([])
    })
  });
  isFetchingQuestions: boolean = false;
  isSubmittingForm: boolean = false;
  @Input() onSubmitForm: any;
  constructor(private auditFormApi: AuditFormApi, private mainErrorService: MainErrorService) { }

  ngOnInit(): void {
    this.auditForm.get('auditDetails.auditType')?.valueChanges.subscribe(
      (auditType: string) => {
        if(auditType === 'default') {
          this.questions = [];
          (<FormArray>this.auditForm.get('auditDetails.auditQuestions')).clear();
          this.auditForm.get('auditDetails.auditQuestions')?.markAsUntouched();
          return;
        }
        this.isFetchingQuestions = true;
        this.auditFormApi.getAuditQuestions(auditType).subscribe(
          (auditQuestions: any) => { 
            this.questions = auditQuestions;
            auditQuestions.forEach(() => {
              const formControl = new FormControl(null,Validators.required);
              (<FormArray>this.auditForm.get('auditDetails.auditQuestions')).push(formControl);
            });
            this.isFetchingQuestions = false;
          }, (error: any) => {
            this.isFetchingQuestions = false;
            this.mainErrorService.setErrorObj(error.error);
          });
      });
  }
  onSubmit() {
    this.auditForm.markAllAsTouched();
    if(this.auditForm.valid) {
      const audit = new Audit(
        this.auditForm.value.projectName,
        this.auditForm.value.projectManagerName,
        this.auditForm.value.applicationOwnerName,
        this.auditForm.value.auditDetails)
      this.onSubmitForm(audit);
    }
  }
  auditTypeValidator(control: FormControl) {
    if(!this.auditTypes.map((type) => type.value).includes(control.value)) {
      return { 'auditTypeInvalid': true };
    } else {
      return null;
    }
  }
  getAuditQuestionsFormGroup() {
    return <FormGroup>this.auditForm.get('auditDetails.auditQuestions');
  }
  getAuditDetailsFormGroup() {
    return <FormGroup>this.auditForm.get('auditDetails');
  }
  getFormControlClass(controlName: string) {
    const formControl = this.auditForm.get(controlName);
    if(controlName === 'auditDetails.auditQuestions') {
      let touched = true;
      (<FormArray>formControl)?.controls.forEach((control) => { touched = touched && control.touched; });
      return !formControl?.valid && touched? 'is-invalid' : ''; 
    }
    if(!formControl?.touched) {
      return '';
    }
    if (formControl.valid && formControl.touched) {
      return 'is-valid';
    }
    return 'is-invalid';
  }
  isLoading() {
    return this.isFetchingQuestions || this.isSubmittingForm;
  }
  onReset() {
    this.auditForm.reset({
      projectName: '', projectManagerName: '', applicationOwnerName: '', 
      auditDetails: {
        auditDate: '', auditType: 'default', auditQuestions: []
      }
    });
  }
}
