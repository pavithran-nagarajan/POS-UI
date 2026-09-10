// sidebar-state.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarStateService {
  get opened(): boolean {
    return this.isOpen;
  }

  private isOpen = false;

  close(): void {
    this.isOpen = false;
    document.body.classList.remove('sidebar-open');
  }

  open(): void {
    this.isOpen = true;
    document.body.classList.add('sidebar-open');
  }

  toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}