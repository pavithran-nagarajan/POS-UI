import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchBox } from "../search-box/search-box";
import { Button } from "../button/button";

@Component({
  selector: "app-grid-toolbar",
  standalone: true,
  imports: [CommonModule, SearchBox, Button],
  templateUrl: "./grid-toolbar.html",
  styleUrl: "./grid-toolbar.scss",
})
export class GridToolbar {
  @Input() searchPlaceholder = "Search";
  @Input() debounceMs = 0;

  @Input() showActionButton = true;
  @Input() actionButtonName = "Add";
  @Input() actionButtonIcon?: string;
  @Input() actionButtonVariant = "primary";
  @Input() actionButtonDisabled = false;

  @Output() searchChange = new EventEmitter<string>();
  @Output() actionClick = new EventEmitter<Event>();

  onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }

  onActionClick(event: Event): void {
    this.actionClick.emit(event);
  }
}