import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ToastService } from '../../common/services/toast.service';
import { Toast } from '../../common/models/toast.model';
import { User } from '../../models/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hide = true;
  loading = false;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      admin: [null]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true
      let userData: User = {
        email: this.form.get('userEmail')?.value,
        name: this.form.get('name')?.value,
        lastName: this.form.get('lastName')?.value,
        credentials: this.form.get('password')?.value,
        admin: this.form.get('admin')?.value
      }
      this.authService.register(userData).subscribe({
        next: response => {
          let toast: Toast = {
            type: 'success',
            message: "User registration successfully!",
          }
          this.loading = false;
          this.toastService.showMessage(toast);
          this.authService.logout();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        },
        error: error => {
          let toast: Toast = {
            type: 'error',
            message: "We got some issue in registration. Please, try again!",
          }
          this.loading = false;
          this.toastService.showMessage(toast);
          this.form.reset();
        },
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
