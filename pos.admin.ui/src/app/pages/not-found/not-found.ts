import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <h1>404</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <a routerLink="/">Go back home</a>
    </div>
  `,
  styles: [`
    .not-found { text-align: center; padding: 4rem 1rem; }
    h1 { font-size: 4rem; margin: 0; }
  `]
})
export class NotFoundComponent {}