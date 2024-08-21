import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [ApiService],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      this.errorMessage = '';
      this.apiService.postData('auth/login', this.loginForm.value).subscribe({
        next: (response: any) => {
          localStorage.setItem('jwt', response.token);
          console.log(response);
          this.router.navigate(['/clients']);
        },
        error: (err) => {
          console.log(err);
          if (err.status === 401) {
            this.errorMessage = 'Incorrect username or password.'; // Mensaje de error para 401
          } else {
            this.errorMessage =
              'An unexpected error occurred. Please try again later.';
          }
        },
      });
    } else {
      this.errorMessage = 'Please fill out the form.';
    }
  }
}
