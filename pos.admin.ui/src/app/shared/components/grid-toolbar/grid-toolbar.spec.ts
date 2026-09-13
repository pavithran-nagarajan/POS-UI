import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Button } from '../button/button';
import { SearchBox } from '../search-box/search-box';
import { GridToolbar } from './grid-toolbar';

describe('GridToolbar', () => {
  let fixture: ComponentFixture<GridToolbar>;
  let component: GridToolbar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(GridToolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use default values', () => {
    expect(component.actionButtonName()).toBe('Add');
    expect(component.actionButtonVariant()).toBe('primary');
    expect(component.actionButtonIcon()).toBeUndefined();
    expect(component.canShowActionButton()).toBe(true);
    expect(component.isActionButtonDisabled()).toBe(false);
    expect(component.debounceMs()).toBe(0);
    expect(component.searchPlaceholder()).toBe('Search');
  });

  it('should render the action button when canShowActionButton is true', () => {
    const btn = fixture.debugElement.query(By.directive(Button));
    expect(btn).toBeTruthy();
  });

  it('should not render the action button when canShowActionButton is false', () => {
    fixture.componentRef.setInput('canShowActionButton', false);
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.directive(Button));
    expect(btn).toBeFalsy();
  });

  it('should pass variant, name, icon and disabled state to the button', () => {
    fixture.componentRef.setInput('actionButtonVariant', 'danger');
    fixture.componentRef.setInput('actionButtonName', 'Delete');
    fixture.componentRef.setInput('actionButtonIcon', 'bi-trash');
    fixture.componentRef.setInput('isActionButtonDisabled', true);
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.directive(Button)).componentInstance as Button;
    expect(btn.variant()).toBe('danger');
    expect(btn.name()).toBe('Delete');
    expect(btn.icon()).toBe('bi-trash');
    expect(btn.isDisabled()).toBe(true);
  });

  it('should emit actionClick when the button emits buttonClick', () => {
    const emitSpy = vi.spyOn(component.actionClick, 'emit');
    const fakeEvent = new Event('click');

    const btn = fixture.debugElement.query(By.directive(Button));
    btn.triggerEventHandler('buttonClick', fakeEvent);

    expect(emitSpy).toHaveBeenCalledWith(fakeEvent);
  });

  it('should not emit actionClick when the action button is hidden', () => {
    fixture.componentRef.setInput('canShowActionButton', false);
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.actionClick, 'emit');

    component.onActionClick(new Event('click'));

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should pass placeholder and debounceMs to the search box', () => {
    fixture.componentRef.setInput('searchPlaceholder', 'Find a product');
    fixture.componentRef.setInput('debounceMs', 300);
    fixture.detectChanges();

    const searchBox = fixture.debugElement.query(By.directive(SearchBox)).componentInstance as SearchBox;
    expect(searchBox.placeholder()).toBe('Find a product');
    expect(searchBox.debounceMs()).toBe(300);
  });

  it('should always render the search box regardless of canShowActionButton', () => {
    fixture.componentRef.setInput('canShowActionButton', false);
    fixture.detectChanges();

    const searchBox = fixture.debugElement.query(By.directive(SearchBox));
    expect(searchBox).toBeTruthy();
  });

  it('should emit searchChange when the search box emits searchChange', () => {
    const emitSpy = vi.spyOn(component.searchChange, 'emit');

    const searchBox = fixture.debugElement.query(By.directive(SearchBox));
    searchBox.triggerEventHandler('searchChange', 'invoice');

    expect(emitSpy).toHaveBeenCalledWith('invoice');
  });

  it('should emit an empty string when the search box is cleared', () => {
    const emitSpy = vi.spyOn(component.searchChange, 'emit');

    const searchBox = fixture.debugElement.query(By.directive(SearchBox));
    searchBox.triggerEventHandler('searchChange', '');

    expect(emitSpy).toHaveBeenCalledWith('');
  });
});