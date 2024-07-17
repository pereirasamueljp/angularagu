import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { LoginData } from '../../api/models/data-login.model';
import { Toast } from '../../common/models/toast.model';
import { ToastService } from '../../common/services/toast.service'

@Component({
  selector: 'app-login',
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
    MatProgressBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    // if (this.userLoginService.isLoggedIn()) {
    //   this.router.navigate(['/informativos'])
    // }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true
      let loginData: LoginData = {
        email: this.form.get('userEmail')?.value,
        credentials: this.form.get('password')?.value
      }
      this.authService.login(loginData.email, loginData.credentials).subscribe({
        next: userInfo => {
          let toast: Toast = {
            type: 'success',
            message: "Login in successful!",
          }
          this.loading = false;
          this.toastService.showMessage(toast);
          localStorage.setItem('token', userInfo.token)
          setTimeout(() => {
            this.router.navigate(['/tasks']);
          }, 1000);
        },
        error: error => {
          let toast: Toast = {
            type: 'error',
            message: "Wrong user or password!",
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
