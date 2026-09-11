import { CommonModule } from '@angular/common';
import { type HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  type AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  type ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, exhaustMap, of, Subject, tap } from 'rxjs';

import { AuthService } from '../../core/services/auth';

const required = (control: AbstractControl): null | ValidationErrors =>
  Validators.required(control);
const emailFormat = (control: AbstractControl): null | ValidationErrors =>
  Validators.email(control);

interface ApiErrorBody {
  message?: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-login',
  standalone: true,
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class LoginComponent {
  errorMessage = '';
  isLoading = false;

  private fb = inject(FormBuilder).nonNullable;
  loginForm = this.fb.group({
    email: ['', [required, emailFormat]],
    password: ['', [required, Validators.minLength(6)]],
  });
  private auth = inject(AuthService);

  private router = inject(Router);

  private submit$ = new Subject<{ email: string; password: string }>();

  private loginResult = toSignal(
    this.submit$.pipe(
      exhaustMap(({ email, password }) => {
        this.isLoading = true;
        this.errorMessage = '';

        return this.auth.login(email, password).pipe(
          tap(() => {
            this.isLoading = false;
            void this.router.navigate(['/dashboard']);
          }),
          catchError((err: HttpErrorResponse) => {
            this.isLoading = false;
            this.errorMessage = this.getErrorMessage(err);
            return of(null);
          }),
        );
      }),
    ),
  );

  getErrorMessage(err: HttpErrorResponse): string {
    const body = err.error as ApiErrorBody | null;
    if (typeof body === 'object' && body !== null && typeof body.message === 'string') {
      return body.message;
    }
    return 'Invalid credentials';
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();
    this.submit$.next({ email, password });
  }
}