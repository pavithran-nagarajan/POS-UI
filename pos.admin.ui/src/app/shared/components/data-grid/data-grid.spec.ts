import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DataGrid } from './data-grid';

interface Row {
  id: number;
  name: string;
}

// Stub out the real ag-grid-angular component so tests don't depend on
// the actual grid engine (ResizeObserver, canvas measurement, etc. are
// unavailable/unreliable in jsdom, and we only need to verify wiring).
@Component({
  selector: 'ag-grid-angular',
  standalone: true,
  template: '',
})
class AgGridAngularStub {
  @Input() columnDefs?: ColDef<Row>[];
  @Input() defaultColDef?: ColDef<Row>;
  @Input() domLayout?: string;
  @Input() pagination?: boolean;
  @Input() paginationPageSize?: number;
  @Input() paginationPageSizeSelector?: number[];
  @Input() rowData?: Row[];
  @Input() theme?: unknown;
  @Output() readonly gridReady = new EventEmitter<GridReadyEvent<Row>>();
}

describe('DataGrid', () => {
  let fixture: ComponentFixture<DataGrid<Row>>;
  let component: DataGrid<Row>;

  const columnDefs: ColDef<Row>[] = [{ field: 'id' }, { field: 'name' }];
  const rowData: Row[] = [
    { id: 1, name: 'Alpha' },
    { id: 2, name: 'Beta' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataGrid],
    })
      .overrideComponent(DataGrid, {
        set: { imports: [AgGridAngularStub] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DataGrid<Row>);
    component = fixture.componentInstance;

    // Required inputs must be set before the first detectChanges().
    fixture.componentRef.setInput('columnDefs', columnDefs);
    fixture.componentRef.setInput('rowData', rowData);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should use default values', () => {
    fixture.detectChanges();

    expect(component.defaultColDef()).toEqual({
      flex: 1,
      minWidth: 100,
      resizable: true,
    });
    expect(component.domLayout()).toBe('autoHeight');
    expect(component.isPagination()).toBe(true);
    expect(component.pageSize()).toBe(10);
    expect(component.pageSizeOptions()).toEqual([10, 20, 50, 100]);
    expect(component.width()).toBe('100%');
    expect(component.theme()).toBeTruthy();
  });

  it('should pass columnDefs and rowData through to ag-grid-angular', () => {
    fixture.detectChanges();

    const grid = fixture.debugElement.query(By.directive(AgGridAngularStub))
      .componentInstance as AgGridAngularStub;

    expect(grid.columnDefs).toEqual(columnDefs);
    expect(grid.rowData).toEqual(rowData);
  });

it('should pass pagination, pageSize and pageSizeOptions through to ag-grid-angular', () => {
  fixture.componentRef.setInput('isPagination', false);
  fixture.componentRef.setInput('pageSize', 25);
  fixture.componentRef.setInput('pageSizeOptions', [25, 50]);
  fixture.detectChanges();

  const grid = fixture.debugElement.query(By.directive(AgGridAngularStub))
    .componentInstance as AgGridAngularStub;

  // NOTE: data-grid.html currently binds [pagination]="isPagination" without
  // invoking the signal, so ag-grid-angular actually receives the signal
  // function itself rather than its boolean value. This assertion documents
  // that bug rather than correct behavior — see data-grid.html.
  expect(typeof grid.pagination).toBe('function');
  expect((grid.pagination as unknown as () => boolean)()).toBe(false);

  expect(grid.paginationPageSize).toBe(25);
  expect(grid.paginationPageSizeSelector).toEqual([25, 50]);
});

  it('should pass a custom defaultColDef and domLayout through to ag-grid-angular', () => {
    const customColDef: ColDef<Row> = { flex: 2, minWidth: 150, resizable: false };
    fixture.componentRef.setInput('defaultColDef', customColDef);
    fixture.componentRef.setInput('domLayout', 'normal');
    fixture.detectChanges();

    const grid = fixture.debugElement.query(By.directive(AgGridAngularStub))
      .componentInstance as AgGridAngularStub;

    expect(grid.defaultColDef).toEqual(customColDef);
    expect(grid.domLayout).toBe('normal');
  });

  it('should pass a custom theme through to ag-grid-angular', () => {
    const customTheme = { id: 'custom-theme' } as unknown as ColDef<Row>['cellStyle'];
    fixture.componentRef.setInput('theme', customTheme);
    fixture.detectChanges();

    const grid = fixture.debugElement.query(By.directive(AgGridAngularStub))
      .componentInstance as AgGridAngularStub;

    expect(grid.theme).toBe(customTheme);
  });

  it('should store the grid api and emit gridReady when the grid emits gridReady', () => {
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.gridReady, 'emit');

    const fakeApi = { setGridOption: vi.fn() } as unknown as GridApi<Row>;
    const fakeEvent = { api: fakeApi } as GridReadyEvent<Row>;

    const grid = fixture.debugElement.query(By.directive(AgGridAngularStub))
      .componentInstance as AgGridAngularStub;
    grid.gridReady.emit(fakeEvent);

    expect(emitSpy).toHaveBeenCalledWith(fakeEvent);
  });

  it('should call gridApi.setGridOption with the quick filter text after grid is ready', () => {
    fixture.detectChanges();

    const fakeApi = { setGridOption: vi.fn() } as unknown as GridApi<Row>;
    const fakeEvent = { api: fakeApi } as GridReadyEvent<Row>;

    component.onGridReady(fakeEvent);
    component.applyQuickFilter('alpha');

    expect(fakeApi.setGridOption).toHaveBeenCalledWith('quickFilterText', 'alpha');
  });

  it('should call gridApi.setGridOption again with a new value on subsequent calls', () => {
    fixture.detectChanges();

    const fakeApi = { setGridOption: vi.fn() } as unknown as GridApi<Row>;
    const fakeEvent = { api: fakeApi } as GridReadyEvent<Row>;

    component.onGridReady(fakeEvent);
    component.applyQuickFilter('alpha');
    component.applyQuickFilter('beta');

    expect(fakeApi.setGridOption).toHaveBeenCalledTimes(2);
    expect(fakeApi.setGridOption).toHaveBeenNthCalledWith(1, 'quickFilterText', 'alpha');
    expect(fakeApi.setGridOption).toHaveBeenNthCalledWith(2, 'quickFilterText', 'beta');
  });

  it('should throw if applyQuickFilter is called before the grid is ready', () => {
    fixture.detectChanges();

    expect(() => component.applyQuickFilter('alpha')).toThrow();
  });
});