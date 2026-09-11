import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, exhaustMap, of, Subject, tap } from 'rxjs';

import { AuthService } from '../../core/services/auth';

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

  private fb = inject(FormBuilder);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  private auth = inject(AuthService);

  private router = inject(Router);

  private submit$ = new Subject<{ email: string; password: string }>();

  // toSignal subscribes eagerly and tears down automatically via DestroyRef.
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
          catchError((err) => {
            this.isLoading = false;
            this.errorMessage = err?.error?.message || 'Invalid credentials';
            return of(null);
          }),
        );
      }),
    ),
  );

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();
    this.submit$.next({ email: email!, password: password! });
  }
}