import { Component, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { OverlayScrollbars } from 'overlayscrollbars';
import { SidebarStateService } from '../../core/services/sidebar-state.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements AfterViewInit, OnDestroy {
  private osInstance?: OverlayScrollbars;

  constructor(
    private sidebarState: SidebarStateService,
    private elRef: ElementRef
  ) {}

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