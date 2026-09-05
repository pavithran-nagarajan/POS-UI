import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrls: ['./button.scss']
})
export class Button {
  /** 'button' | 'submit' | 'reset' */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** Text shown on the button */
  @Input() name: string = '';

  /** Disable the button */
  @Input() disabled: boolean = false;

  /** Bootstrap variant: primary | secondary | success | danger | warning | info | light | dark | link */
  @Input() variant: string = 'primary';

  /** Optional Bootstrap Icons class, e.g. "bi-check-circle", "bi-trash" (without the "bi" base class) */
  @Input() icon?: string;

  /** Where to show the icon relative to the text */
  @Input() iconPosition: 'left' | 'right' = 'left';

  /** Emits when the button is clicked, so parent can bind its own handler */
  @Output() onClick: EventEmitter<Event> = new EventEmitter<Event>();

  handleClick(event: Event): void {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }
}