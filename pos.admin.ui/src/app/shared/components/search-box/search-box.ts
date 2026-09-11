import {
  ChangeDetectionStrategy,
  Component,
  input,
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
  readonly debounceMs = input(0);
  readonly placeholder = input('Search');

  private searchTextSubject = new Subject<string>();

  searchChange = outputFromObservable(
    this.searchTextSubject.pipe(
      debounceTime(this.debounceMs()),
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