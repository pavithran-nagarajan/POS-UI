import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { GridToolbar } from '../../../shared/components/grid-toolbar/grid-toolbar';
import { DataGrid } from '../../../shared/components/data-grid/data-grid';
import {
  EditActionRenderer,
  EditActionCellRendererParams,
} from '../../../shared/components/grid-action-buttons/edit-action-renderer/edit-action-renderer';
import { PageState } from '../company/company..model';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [DataGrid, GridToolbar],
  templateUrl: './company.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './company.scss',
})
export class Company implements OnInit {
  @ViewChild(DataGrid) grid!: DataGrid;

  pageState: PageState = {
    companyState: {},
    gridState: {
      companyGrid: { columnDefs: [], rowData: [] },
    },
  };

  ngOnInit(): void {
    this.initPage();
    this.bindGrid();
  }

  private initPage(): void {}

  private bindGrid(): void {
    //define column
    this.pageState.gridState.companyGrid.columnDefs = [
      {
        field: 'companyName',
        headerName: 'Company Name',
        minWidth: 200,
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Action',
        maxWidth: 150,
        sortable: false,
        filter: false,
        getQuickFilterText: () => '',
        cellRenderer: EditActionRenderer,
        cellRendererParams: {
          onEdit: (data: any) => this.onEditCompany(data),
          title: 'Edit Company',
        } as EditActionCellRendererParams,
      },
    ];

    //define row
    this.pageState.gridState.companyGrid.rowData = [
      { id: 1, companyName: 'Acme Corp' },
      { id: 2, companyName: 'Globex Inc' },
      { id: 3, companyName: 'Initech' },
      { id: 4, companyName: 'Umbrella Corporation' },
      { id: 5, companyName: 'Stark Industries' },
      { id: 6, companyName: 'Wayne Enterprises' },
      { id: 7, companyName: 'Wonka Industries' },
      { id: 8, companyName: 'Cyberdyne Systems' },
      { id: 9, companyName: 'Soylent Corp' },
      { id: 10, companyName: 'Hooli' },
      { id: 11, companyName: 'Massive Dynamic' },
      { id: 12, companyName: 'Aperture Science' },
      { id: 13, companyName: 'Oscorp Industries' },
      { id: 14, companyName: 'Tyrell Corporation' },
      { id: 15, companyName: 'Weyland-Yutani' },
      { id: 16, companyName: 'Gekko & Co' },
      { id: 17, companyName: 'Pied Piper' },
      { id: 18, companyName: 'Vandelay Industries' },
      { id: 19, companyName: 'Prestige Worldwide' },
      { id: 20, companyName: 'Dunder Mifflin' },
    ];
  }

  onEditCompany(company: any) {
    console.log('Edit company:', company);
  }

  onSearchChange(value: string) {
    this.grid.applyQuickFilter(value);
  }

  onAddCompany() {
    alert('Add');
  }
}
