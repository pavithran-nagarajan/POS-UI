import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellStyleModule,
  ClientSideRowModelModule,
  type ColDef,
  enableDevValidations,
  type GridApi,
  type GridReadyEvent,
  ModuleRegistry,
  PaginationModule,
  QuickFilterModule,
  TextFilterModule,
  type Theme,
  themeQuartz,
} from 'ag-grid-community';

import { environment } from '../../../../environments/environment';

if (!environment.production) {
  enableDevValidations();
}

ModuleRegistry.registerModules([
  PaginationModule,
  ClientSideRowModelModule,
  TextFilterModule,
  CellStyleModule,
  QuickFilterModule,
]);

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AgGridAngular],
  selector: 'app-data-grid',
  standalone: true,
  templateUrl: './data-grid.html',
})
export class DataGrid<TData> {
  readonly columnDefs = input.required<ColDef<TData>[]>();
  readonly defaultColDef = input<ColDef<TData>>({
    flex: 1,
    minWidth: 100,
    resizable: true,
  });
  readonly domLayout = input<'autoHeight' | 'normal' | undefined>('autoHeight');
  @Output() gridReady = new EventEmitter<GridReadyEvent<TData>>();
  readonly isPagination = input(true);
  readonly pageSize = input(10);
  readonly pageSizeOptions = input([10, 20, 50, 100]);
  readonly rowData = input.required<TData[]>();
  readonly theme = input<Theme>(
    themeQuartz.withParams({
      accentColor: '#0d6efd',
      borderColor: '#dee2e6',
      headerBackgroundColor: '#f8f9fa',
      headerColumnBorder: { color: '#dee2e6' },
      headerFontWeight: 600,
      headerTextColor: '#495057',
      oddRowBackgroundColor: '#ffff',
      rowHoverColor: '#f1f3f5',
    }),
  );

  readonly width = input('100%');

  private gridApi!: GridApi<TData>;

  applyQuickFilter(value: string) {
    this.gridApi.setGridOption('quickFilterText', value);
  }

  onGridReady(params: GridReadyEvent<TData>) {
    this.gridApi = params.api;
    this.gridReady.emit(params);
  }
}
