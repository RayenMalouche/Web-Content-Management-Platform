import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-website-setup-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './website-setup-component.component.html',
  standalone: true,
  styleUrl: './website-setup-component.component.scss'
})
export class WebsiteSetupComponentComponent {
  setupForm: FormGroup;

  @Output() setupSubmitted = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.setupForm = this.fb.group({
      websiteName: ['', Validators.required],
      domainName: ['', Validators.required],
      websiteType: ['', Validators.required],
      primaryColor: ['#000000', Validators.required]
    });
  }

  onSubmit() {
    if (this.setupForm.valid) {
      this.setupSubmitted.emit(this.setupForm.value);
    }
  }

}
