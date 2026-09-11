import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
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
export class SearchBox {
  @Input() debounceMs = 0;
  @Input() placeholder = 'Search';

  private searchTextSubject = new Subject<string>();

  // No subscribe() — outputFromObservable subscribes internally
  // and tears down automatically on destroy.
  searchChange = outputFromObservable(
    this.searchTextSubject.pipe(
      debounceTime(this.debounceMs),
      distinctUntilChanged(),
    ),
  );

  searchText = '';

  clear() {
    this.searchText = '';
    this.searchTextSubject.next('');
  }

  onInput() {
    this.searchTextSubject.next(this.searchText);
  }
}