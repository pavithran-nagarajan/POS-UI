import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { environment } from '../../../../environments/environment';
import {
  ClientSideRowModelModule,
  ColDef,
  GridApi,
  GridReadyEvent,
  ModuleRegistry,
  PaginationModule,
  TextFilterModule,
  CellStyleModule,
  QuickFilterModule,
  enableDevValidations,
  themeQuartz,
  Theme,
} from 'ag-grid-community';

if (environment.production == false) {
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
  selector: 'app-data-grid',
  standalone: true,
  imports: [AgGridAngular],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './data-grid.html',
})
export class DataGrid<TData> {
  @Input({ required: true }) columnDefs!: ColDef<TData>[];
  @Input({ required: true }) rowData!: TData[];
  @Input() defaultColDef: ColDef<TData> = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
  @Input() theme: Theme = themeQuartz.withParams({
    headerBackgroundColor: '#f8f9fa',
    headerTextColor: '#495057',
    headerColumnBorder: { color: '#dee2e6' },
    borderColor: '#dee2e6',
    accentColor: '#0d6efd',
    oddRowBackgroundColor: '#ffff',
    rowHoverColor: '#f1f3f5',
    headerFontWeight: 600,
  });
  @Input() domLayout: 'autoHeight' | 'normal' | undefined = 'autoHeight';
  @Input() isPagination = true;
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [10, 20, 50, 100];
  @Input() width = '100%';

  @Output() gridReady = new EventEmitter<GridReadyEvent<TData>>();

  private gridApi!: GridApi<TData>;

  onGridReady(params: GridReadyEvent<TData>) {
    this.gridApi = params.api;
    this.gridReady.emit(params);
  }

  applyQuickFilter(value: string) {
    this.gridApi.setGridOption('quickFilterText', value);
  }
}
