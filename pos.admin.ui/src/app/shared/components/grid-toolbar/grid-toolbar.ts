import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

import { Button } from '../button/button';
import { SearchBox } from '../search-box/search-box';

@Component({
  selector: 'app-grid-toolbar',
  standalone: true,
  imports: [CommonModule, SearchBox, Button],
  templateUrl: './grid-toolbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './grid-toolbar.scss',
})
export class GridToolbar {
  @Input() searchPlaceholder = 'Search';
  @Input() debounceMs = 0;

  @Input() canShowActionButton = true;
  @Input() actionButtonName = 'Add';
  @Input() actionButtonIcon?: string;
  @Input() actionButtonVariant = 'primary';
  @Input() isActionButtonDisabled = false;

  @Output() searchChange = new EventEmitter<string>();
  @Output() actionClick = new EventEmitter<Event>();

  onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }

  onActionClick(event: Event): void {
    this.actionClick.emit(event);
  }
}
