import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header, Footer, Sidebar],
  templateUrl: './main-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
