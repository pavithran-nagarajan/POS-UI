import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  selector: 'app-button',
  standalone: true,
  styleUrls: ['./button.scss'],
  templateUrl: './button.html',
})
export class Button {
  @Output() buttonClick = new EventEmitter<Event>();
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() isDisabled = false;
  @Input() name = '';
  @Input() type: 'button' | 'reset' | 'submit' = 'button';

  @Input() variant = 'primary';

  handleClick(event: Event): void {
    if (!this.isDisabled) {
      this.buttonClick.emit(event);
    }
  }
}