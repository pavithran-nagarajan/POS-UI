import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGrid } from './data-grid';

describe('DataGrid', () => {
  let component: DataGrid<unknown>;
  let fixture: ComponentFixture<DataGrid<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGrid<unknown>);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
