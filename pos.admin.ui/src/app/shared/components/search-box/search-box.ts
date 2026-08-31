import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Subject, debounceTime, distinctUntilChanged } from "rxjs";

@Component({
  selector: "app-search-box",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./search-box.html",
  styleUrl: "./search-box.scss",
})
export class SearchBox implements OnInit {
  @Input() placeholder = "Search";
  @Input() debounceMs = 0;
  @Output() searchChange = new EventEmitter<string>();

  searchText = "";
  private searchSubject = new Subject<string>();

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(this.debounceMs), distinctUntilChanged())
      .subscribe((value) => this.searchChange.emit(value));
  }

  onInput() {
    this.searchSubject.next(this.searchText);
  }

  clear() {
    this.searchText = "";
    this.searchSubject.next("");
  }
}