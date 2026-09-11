import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActionRenderer } from './edit-action-renderer';

describe('EditActionRenderer', () => {
  let component: EditActionRenderer;
  let fixture: ComponentFixture<EditActionRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditActionRenderer],
    }).compileComponents();

    fixture = TestBed.createComponent(EditActionRenderer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
