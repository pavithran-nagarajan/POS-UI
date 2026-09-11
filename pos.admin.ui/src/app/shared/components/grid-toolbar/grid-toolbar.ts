import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';

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
  readonly actionButtonIcon = input<string>();
  readonly actionButtonName = input('Add');

  readonly actionButtonVariant = input('primary');
  @Output() actionClick = new EventEmitter<Event>();
  readonly canShowActionButton = input(true);
  readonly debounceMs = input(0);
  readonly isActionButtonDisabled = input(false);

  @Output() searchChange = new EventEmitter<string>();
  readonly searchPlaceholder = input('Search');

  onActionClick(event: Event): void {
    this.actionClick.emit(event);
  }

  onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }
}
