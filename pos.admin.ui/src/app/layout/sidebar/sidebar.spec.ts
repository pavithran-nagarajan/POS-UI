import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, RouterLink } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SidebarStateService } from '../../core/services/sidebar-state';
import { SIDEBAR_MENU } from './sidebar.data';
import { type MenuItem } from './sidebar.model';
import { Sidebar } from './sidebar';

vi.mock('overlayscrollbars', () => ({
  OverlayScrollbars: vi.fn(() => ({
    destroy: vi.fn(),
  })),
}));

describe('Sidebar', () => {
  let fixture: ComponentFixture<Sidebar>;
  let component: Sidebar;
  let sidebarStateMock: { close: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    sidebarStateMock = { close: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [
        provideRouter([]),
        { provide: SidebarStateService, useValue: sidebarStateMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    // Intentionally NOT calling fixture.detectChanges() here.
    // Each test sets any custom menuItems first, then triggers
    // a single clean detectChanges() call with final data in place.
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load the default menu items from SIDEBAR_MENU', () => {
    fixture.detectChanges();
    expect(component.menuItems).toBe(SIDEBAR_MENU);
    expect(component.menuItems.length).toBeGreaterThan(0);
  });

  it('should render a nav-item for every top-level menu entry', () => {
    fixture.detectChanges();
    const navItems = fixture.debugElement.queryAll(By.css('.sidebar-menu > .nav-item'));
    expect(navItems.length).toBe(component.menuItems.length);
  });

  it('should render the label for each top-level menu item', () => {
    fixture.detectChanges();
    const labels = fixture.debugElement
      .queryAll(By.css('.sidebar-menu > .nav-item .nav-link p'))
      .map((el) => (el.nativeElement as HTMLElement).textContent?.trim());

    for (const item of component.menuItems) {
      expect(labels.some((label) => label?.startsWith(item.label))).toBe(true);
    }
  });

  it('should render a RouterLink directive pointing to the item link', () => {
    fixture.detectChanges();

    const firstLinkDe = fixture.debugElement.query(By.css('.sidebar-menu > .nav-item .nav-link'));
    const routerLinkDirective = firstLinkDe.injector.get(RouterLink);

    expect(routerLinkDirective).toBeTruthy();
    expect(firstLinkDe.nativeElement.getAttribute('href')).toBe(component.menuItems[0].link);
  });

  it('should render nested children in a nav-treeview when children exist', () => {
    fixture.detectChanges();

    const parentWithChildren = component.menuItems.find((item) => item.children?.length);
    expect(parentWithChildren).toBeTruthy();

    const treeviews = fixture.debugElement.queryAll(By.css('.nav-treeview'));
    expect(treeviews.length).toBeGreaterThan(0);
  });

  it('should not render a nav-treeview for items without children', () => {
    fixture.detectChanges();

    const leafItem = component.menuItems.find((item) => !item.children?.length);
    expect(leafItem).toBeTruthy();

    const navItems = fixture.debugElement.queryAll(By.css('.sidebar-menu > .nav-item'));
    const leafIndex = component.menuItems.findIndex((item) => item === leafItem);
    const leafTreeview = navItems[leafIndex].query(By.css(':scope > .nav-treeview'));

    expect(leafTreeview).toBeFalsy();
  });

  it('should render a badge when the item has one', () => {
    const itemsWithBadge: MenuItem[] = [{ badge: '5', label: 'Test Badge', link: '/test' }];
    component.menuItems = itemsWithBadge;
    fixture.detectChanges();

    const badge = fixture.debugElement.query(By.css('.nav-badge'));
    expect(badge).toBeTruthy();
    expect((badge.nativeElement as HTMLElement).textContent?.trim()).toBe('5');
  });

  it('should not render a badge when the item has none', () => {
    const itemsWithoutBadge: MenuItem[] = [{ label: 'No Badge', link: '/test' }];
    component.menuItems = itemsWithoutBadge;
    fixture.detectChanges();

    const badge = fixture.debugElement.query(By.css('.nav-badge'));
    expect(badge).toBeFalsy();
  });

  it('should render a nav-arrow when the item has children', () => {
    const itemsWithChildren: MenuItem[] = [
      { children: [{ label: 'Child', link: '/child' }], label: 'Parent', link: '/parent' },
    ];
    component.menuItems = itemsWithChildren;
    fixture.detectChanges();

    const arrow = fixture.debugElement.query(By.css('.nav-arrow'));
    expect(arrow).toBeTruthy();
  });

  it('should render a nav-header instead of a link when header is true', () => {
    const headerItems: MenuItem[] = [{ header: true, label: 'Section Title' }];
    component.menuItems = headerItems;
    fixture.detectChanges();

    const header = fixture.debugElement.query(By.css('.nav-header'));
    expect(header).toBeTruthy();
    expect((header.nativeElement as HTMLElement).textContent?.trim()).toBe('Section Title');

    const link = fixture.debugElement.query(By.css('.nav-item .nav-link'));
    expect(link).toBeFalsy();
  });

  it('should call sidebarState.close() when the close button is clicked', () => {
    fixture.detectChanges();

    const closeBtn = fixture.debugElement.query(By.css('.sidebar-close-btn'));
    closeBtn.triggerEventHandler('click', new Event('click'));

    expect(sidebarStateMock.close).toHaveBeenCalledTimes(1);
  });

  it('should call sidebarState.close() via the component method directly', () => {
    fixture.detectChanges();

    component.closeSidebar();
    expect(sidebarStateMock.close).toHaveBeenCalledTimes(1);
  });

  it('should apply the icon class from the menu item', () => {
    const itemsWithIcon: MenuItem[] = [{ icon: 'bi-house', label: 'Home', link: '/home' }];
    component.menuItems = itemsWithIcon;
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('.nav-icon'));
    expect((icon.nativeElement as HTMLElement).classList.contains('bi-house')).toBe(true);
  });

  it('should destroy the OverlayScrollbars instance on ngOnDestroy without throwing', () => {
    fixture.detectChanges();
    expect(() => fixture.destroy()).not.toThrow();
  });
});