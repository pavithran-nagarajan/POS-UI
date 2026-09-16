import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { MainLayout } from './main-layout';

describe('MainLayout', () => {
  let fixture: ComponentFixture<MainLayout>;
  let component: MainLayout;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayout],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header', () => {
    const header = fixture.debugElement.query(By.directive(Header));
    expect(header).toBeTruthy();
  });

  it('should render the sidebar', () => {
    const sidebar = fixture.debugElement.query(By.directive(Sidebar));
    expect(sidebar).toBeTruthy();
  });

  it('should render the router outlet inside app-main', () => {
    const main = fixture.debugElement.query(By.css('main.app-main'));
    expect(main).toBeTruthy();

    const routerOutlet = main.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeTruthy();
  });

  it('should render the footer', () => {
    const footer = fixture.debugElement.query(By.directive(Footer));
    expect(footer).toBeTruthy();
  });

  it('should render header, sidebar, router-outlet and footer in the correct order', () => {
    const hostElement = fixture.debugElement.nativeElement as HTMLElement;
    const tagNames = Array.from(hostElement.children).map((el) => el.tagName.toLowerCase());

    expect(tagNames).toEqual(['app-header', 'app-sidebar', 'main', 'app-footer']);
  });
});