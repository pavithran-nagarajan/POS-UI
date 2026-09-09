import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./button.scss'],
})
export class Button {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() name = '';
  @Input() isDisabled = false;
  @Input() variant = 'primary';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';

  @Output() buttonClick = new EventEmitter<Event>();

  handleClick(event: Event): void {
    if (!this.isDisabled) {
      this.buttonClick.emit(event);
    }
  }
}