import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, OnDestroy, } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { OverlayScrollbars } from 'overlayscrollbars';

import { SidebarStateService } from '../../core/services/sidebar-state';
import { SIDEBAR_MENU } from './sidebar.data';
import { MenuItem } from './sidebar.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  selector: 'app-sidebar',
  styleUrl: './sidebar.scss',
  templateUrl: './sidebar.html',
})
export class Sidebar implements AfterViewInit, OnDestroy {

  menuItems: MenuItem[] = SIDEBAR_MENU;

  private readonly elRef = inject(ElementRef);

  private osInstance?: OverlayScrollbars;
  private readonly sidebarState = inject(SidebarStateService);

  closeSidebar(): void {
    this.sidebarState.close();
  }

  ngAfterViewInit(): void {
    const isMobile = window.innerWidth <= 992;
    const sidebarWrapper = this.elRef.nativeElement.querySelector('.sidebar-wrapper');

    if (sidebarWrapper && !isMobile) {
      this.osInstance = OverlayScrollbars(sidebarWrapper, {
        scrollbars: {
          autoHide: 'leave',
          clickScroll: true,
          theme: 'os-theme-light',
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.osInstance?.destroy();
  }
}
