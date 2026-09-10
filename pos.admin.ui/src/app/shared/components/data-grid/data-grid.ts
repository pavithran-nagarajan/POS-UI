import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellStyleModule,
  ClientSideRowModelModule,
  ColDef,
  enableDevValidations,
  GridApi,
  GridReadyEvent,
  ModuleRegistry,
  PaginationModule,
  QuickFilterModule,
  TextFilterModule,
  Theme,
  themeQuartz,
} from 'ag-grid-community';

import { environment } from '../../../../environments/environment';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AgGridAngular],
  selector: 'app-data-grid',
  standalone: true,
  templateUrl: './data-grid.html',
})
export class DataGrid<TData> {
  @Input({ required: true }) columnDefs!: ColDef<TData>[];
  @Input() defaultColDef: ColDef<TData> = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
  @Input() domLayout: 'autoHeight' | 'normal' | undefined = 'autoHeight';
  @Output() gridReady = new EventEmitter<GridReadyEvent<TData>>();
  @Input() isPagination = true;
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [10, 20, 50, 100];
  @Input({ required: true }) rowData!: TData[];
  @Input() theme: Theme = themeQuartz.withParams({
    accentColor: '#0d6efd',
    borderColor: '#dee2e6',
    headerBackgroundColor: '#f8f9fa',
    headerColumnBorder: { color: '#dee2e6' },
    headerFontWeight: 600,
    headerTextColor: '#495057',
    oddRowBackgroundColor: '#ffff',
    rowHoverColor: '#f1f3f5',
  });

  @Input() width = '100%';

  private gridApi!: GridApi<TData>;

  applyQuickFilter(value: string) {
    this.gridApi.setGridOption('quickFilterText', value);
  }

  onGridReady(params: GridReadyEvent<TData>) {
    this.gridApi = params.api;
    this.gridReady.emit(params);
  }
}
