import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SearchBox } from './search-box';

describe('SearchBox', () => {
  let fixture: ComponentFixture<SearchBox>;
  let component: SearchBox;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBox],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use default values', () => {
    expect(component.placeholder()).toBe('Search');
    expect(component.debounceMs()).toBe(0);
    expect(component.searchText).toBe('');
  });

  it('should render the placeholder on the input element', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(input.placeholder).toBe('Search');
  });

  it('should render a custom placeholder', () => {
    fixture.componentRef.setInput('placeholder', 'Search invoices');
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(input.placeholder).toBe('Search invoices');
  });

  it('should not render the clear icon when searchText is empty', () => {
    const clearIcon = fixture.debugElement.query(By.css('.clear-icon'));
    expect(clearIcon).toBeFalsy();
  });

  it('should render the clear icon once searchText has a value', () => {
    component.searchText = 'invoice';
    fixture.detectChanges();

    const clearIcon = fixture.debugElement.query(By.css('.clear-icon'));
    expect(clearIcon).toBeTruthy();
  });

  it('should update searchText via ngModel on input', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

    input.value = 'acme corp';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searchText).toBe('acme corp');
  });

  it('should emit searchChange with the typed value after debounce', () => {
    vi.useFakeTimers();
    const onSearchChange = vi.fn();
    component.searchChange.subscribe(onSearchChange);

    component.searchText = 'acme';
    component.onInput();
    vi.advanceTimersByTime(0);

    expect(onSearchChange).toHaveBeenCalledWith('acme');
  });

  it('should not emit for the same consecutive value (distinctUntilChanged)', () => {
    vi.useFakeTimers();
    const onSearchChange = vi.fn();
    component.searchChange.subscribe(onSearchChange);

    component.searchText = 'acme';
    component.onInput();
    vi.advanceTimersByTime(0);

    component.searchText = 'acme';
    component.onInput();
    vi.advanceTimersByTime(0);

    expect(onSearchChange).toHaveBeenCalledTimes(1);
  });

  it('should emit again once the value actually changes', () => {
    vi.useFakeTimers();
    const onSearchChange = vi.fn();
    component.searchChange.subscribe(onSearchChange);

    component.searchText = 'acme';
    component.onInput();
    vi.advanceTimersByTime(0);

    component.searchText = 'acme corp';
    component.onInput();
    vi.advanceTimersByTime(0);

    expect(onSearchChange).toHaveBeenCalledTimes(2);
    expect(onSearchChange).toHaveBeenLastCalledWith('acme corp');
  });

  it('should reset searchText to empty string on clear', () => {
    component.searchText = 'acme';
    fixture.detectChanges();

    component.clear();

    expect(component.searchText).toBe('');
  });

  it('should emit an empty string via searchChange on clear', () => {
    vi.useFakeTimers();
    const onSearchChange = vi.fn();
    component.searchChange.subscribe(onSearchChange);

    component.clear();
    vi.advanceTimersByTime(0);

    expect(onSearchChange).toHaveBeenCalledWith('');
  });

  it('should hide the clear icon after clearing via UI click', () => {
    component.searchText = 'acme';
    fixture.detectChanges();

    const clearIcon = fixture.debugElement.query(By.css('.clear-icon'));
    clearIcon.triggerEventHandler('click', new Event('click'));
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.clear-icon'))).toBeFalsy();
  });

  it('ignores a later debounceMs input change because debounceTime captures the value only once at construction', () => {
    vi.useFakeTimers();

    fixture.componentRef.setInput('debounceMs', 500);
    fixture.detectChanges();

    const onSearchChange = vi.fn();
    component.searchChange.subscribe(onSearchChange);

    component.searchText = 'acme';
    component.onInput();
    vi.advanceTimersByTime(0);

    expect(onSearchChange).toHaveBeenCalledWith('acme');
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});