import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {WebsiteService} from '../../../services/website-service.service';

@Component({
  selector: 'app-create-website-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatSnackBarModule
  ],
  templateUrl: './create-website-modal.component.html',
  styleUrls: ['./create-website-modal.component.scss']
})
export class CreateWebsiteModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();

  isVisible = false;
  faTimes = faTimes;
  websiteForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly websiteService: WebsiteService,
    private readonly snackBar: MatSnackBar
  ) {
    this.websiteForm = this.fb.group({
      name: ['', Validators.required],
      domain: ['', Validators.required],
      type: ['blank', Validators.required],
      primaryColor: ['#000000', Validators.required],
      description: ['', Validators.required]
    });
  }

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

  onClose() {
    this.hide();
    this.close.emit();
  }

  onSubmit() {
    if (this.websiteForm.valid) {
      this.websiteService.createWebsite(this.websiteForm.value).subscribe({
        next: (response) => {
          this.snackBar.open('Website created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.create.emit(response);
          this.websiteForm.reset({
            type: 'blank',
            primaryColor: '#000000'
          });
          this.hide();
        },
        error: () => {
          this.snackBar.open('Error creating website', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
