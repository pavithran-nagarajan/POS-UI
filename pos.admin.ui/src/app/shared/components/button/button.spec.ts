import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Button } from './button';

describe('Button', () => {
  let fixture: ComponentFixture<Button>;
  let component: Button;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use default values', () => {
    const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(btn.getAttribute('type')).toBe('button');
    expect(btn.classList).toContain('btn-primary');
    expect(btn.disabled).toBe(false);
  });

  it('should render the button name', () => {
    fixture.componentRef.setInput('name', 'Save');
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(btn.textContent?.trim()).toBe('Save');
  });

  it('should apply the correct variant class', () => {
    fixture.componentRef.setInput('variant', 'danger');
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(btn.classList).toContain('btn-danger');
    expect(btn.classList).not.toContain('btn-primary');
  });

  it('should set the native type attribute', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(btn.getAttribute('type')).toBe('submit');
  });

  it('should disable the button when isDisabled is true', () => {
    fixture.componentRef.setInput('isDisabled', true);
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it('should render icon on the left by default when icon is set', () => {
    fixture.componentRef.setInput('icon', 'bi-check');
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    const icon = btn.querySelector('i');
    expect(icon).toBeTruthy();
    // icon should come before the text node in DOM order
    expect(btn.firstElementChild?.tagName.toLowerCase()).toBe('i');
  });

  it('should render icon on the right when iconPosition is "right"', () => {
    fixture.componentRef.setInput('icon', 'bi-check');
    fixture.componentRef.setInput('iconPosition', 'right');
    fixture.componentRef.setInput('name', 'Confirm');
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(btn.lastElementChild?.tagName.toLowerCase()).toBe('i');
  });

  it('should not render an icon when icon is not set', () => {
    const btn = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(btn.querySelector('i')).toBeNull();
  });

  it('should emit buttonClick when clicked and not disabled', () => {
    const emitSpy = vi.spyOn(component.buttonClick, 'emit');

    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', new Event('click'));

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should NOT emit buttonClick when clicked while disabled', () => {
    fixture.componentRef.setInput('isDisabled', true);
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.buttonClick, 'emit');

    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', new Event('click'));

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should pass the emitted event object through', () => {
    const emitSpy = vi.spyOn(component.buttonClick, 'emit');
    const fakeEvent = new Event('click');

    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', fakeEvent);

    expect(emitSpy).toHaveBeenCalledWith(fakeEvent);
  });
});