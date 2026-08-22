import { Component } from '@angular/core';
import { SidebarStateService } from '../../core/services/sidebar-state.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  constructor(private sidebarState: SidebarStateService) { }

  closeSidebar(): void {
    this.sidebarState.close();
  }
}
