// sidebar-state.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarStateService {
  private isOpen = false;

  open(): void {
    this.isOpen = true;
    document.body.classList.add('sidebar-open'); // adjust to your AdminLTE class
  }

  close(): void {
    this.isOpen = false;
    document.body.classList.remove('sidebar-open');
  }

  toggle(): void {
    this.isOpen ? this.close() : this.open();
  }

  get opened(): boolean {
    return this.isOpen;
  }
}