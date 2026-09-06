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
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @Input() variant: string = 'primary';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';


  @Output() onClick: EventEmitter<Event> = new EventEmitter<Event>();

  handleClick(event: Event): void {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }
}