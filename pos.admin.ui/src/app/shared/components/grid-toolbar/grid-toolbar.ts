import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Button } from '../button/button';
import { SearchBox } from '../search-box/search-box';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SearchBox, Button],
  selector: 'app-grid-toolbar',
  standalone: true,
  styleUrl: './grid-toolbar.scss',
  templateUrl: './grid-toolbar.html',
})
export class GridToolbar {
  @Input() actionButtonIcon?: string;
  @Input() actionButtonName = 'Add';

  @Input() actionButtonVariant = 'primary';
  @Output() actionClick = new EventEmitter<Event>();
  @Input() canShowActionButton = true;
  @Input() debounceMs = 0;
  @Input() isActionButtonDisabled = false;

  @Output() searchChange = new EventEmitter<string>();
  @Input() searchPlaceholder = 'Search';

  onActionClick(event: Event): void {
    this.actionClick.emit(event);
  }

  onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }
}
