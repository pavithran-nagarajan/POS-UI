import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-box.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-box.scss',
})
export class SearchBox implements OnInit {
  @Input() placeholder = 'Search';
  @Input() debounceMs = 0;
  @Output() searchChange = new EventEmitter<string>();

  searchText = '';
  private searchTextSubject = new Subject<string>();

  ngOnInit() {
    this.searchTextSubject
      .pipe(debounceTime(this.debounceMs), distinctUntilChanged())
      .subscribe((value) => this.searchChange.emit(value));
  }

  onInput() {
    this.searchTextSubject.next(this.searchText);
  }

  clear() {
    this.searchText = '';
    this.searchTextSubject.next('');
  }
}
