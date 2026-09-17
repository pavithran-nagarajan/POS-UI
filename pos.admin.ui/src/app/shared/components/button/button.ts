import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';

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
  
  readonly icon = input<string>();
  readonly iconPosition = input<'left' | 'right'>('left');
  readonly isDisabled = input(false);
  readonly name = input('');
  readonly type = input<'button' | 'reset' | 'submit'>('button');
  readonly variant = input('primary');

  handleClick(event: Event): void {
    if (!this.isDisabled()) {
      this.buttonClick.emit(event);
    }
  }
}