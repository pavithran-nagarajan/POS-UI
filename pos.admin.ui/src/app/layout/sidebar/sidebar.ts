import { Component, ElementRef, AfterViewInit, OnDestroy, inject, ChangeDetectionStrategy, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayScrollbars } from 'overlayscrollbars';
import { SidebarStateService } from '../../core/services/sidebar-state.service';
import { MenuItem } from '../../core/models/menu-item.model';
import { SIDEBAR_MENU } from '../../core/data/sidebar-menu.data';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './sidebar.scss',
})
export class Sidebar implements AfterViewInit, OnDestroy {
  menuItems: MenuItem[] = SIDEBAR_MENU;

  private osInstance?: OverlayScrollbars;

  private readonly sidebarState = inject(SidebarStateService);
  private readonly elRef = inject(ElementRef);

  closeSidebar(): void {
    this.sidebarState.close();
  }

  ngAfterViewInit(): void {
    const isMobile = window.innerWidth <= 992;
    const sidebarWrapper = this.elRef.nativeElement.querySelector('.sidebar-wrapper');

    if (sidebarWrapper && !isMobile) {
      this.osInstance = OverlayScrollbars(sidebarWrapper, {
        scrollbars: {
          theme: 'os-theme-light',
          autoHide: 'leave',
          clickScroll: true,
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.osInstance?.destroy();
  }
}
