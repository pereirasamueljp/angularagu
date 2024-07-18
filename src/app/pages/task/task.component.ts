import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ToastService } from '../../common/services/toast.service';
import { Toast } from '../../common/models/toast.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Task } from '../../models/task.model';
import { ApiService } from '../../core/api/services/api.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatCheckboxModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  hide = true;
  loading = false;
  form: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastService: ToastService,
  ) {
    this.form = this.fb.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true
      let taskData: Task = {
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
      }
      this.apiService.save<Task>('task', taskData).subscribe({
        next: response => {
          let toast: Toast = {
            type: 'success',
            message: "User registration successfully!",
          }
          this.loading = false;
          this.toastService.showMessage(toast);
        }
      });

    } else {
      for (let control in this.form.controls) {
        this.form.get(control)?.markAsTouched();
      }
    }

  }

  onReset(): void {
    this.form.reset();
  }
}
