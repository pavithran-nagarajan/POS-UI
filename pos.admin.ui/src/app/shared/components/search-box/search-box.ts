import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  selector: 'app-search-box',
  standalone: true,
  styleUrl: './search-box.scss',
  templateUrl: './search-box.html',
})
export class SearchBox implements OnInit {
  @Input() debounceMs = 0;
  @Input() placeholder = 'Search';
  @Output() searchChange = new EventEmitter<string>();

  searchText = '';
  private searchTextSubject = new Subject<string>();

  clear() {
    this.searchText = '';
    this.searchTextSubject.next('');
  }

  ngOnInit() {
    this.searchTextSubject
      .pipe(debounceTime(this.debounceMs), distinctUntilChanged())
      .subscribe((value) => this.searchChange.emit(value));
  }

  onInput() {
    this.searchTextSubject.next(this.searchText);
  }
}
