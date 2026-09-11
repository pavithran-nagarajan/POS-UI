import { ChangeDetectionStrategy, Component, type OnInit, ViewChild } from '@angular/core';

import type { CompanyState, PageState } from './company.model';

import { DataGrid } from '../../../shared/components/data-grid/data-grid';
import {
 type EditActionCellRendererParams,
  EditActionRenderer,
} from '../../../shared/components/grid-action-buttons/edit-action-renderer/edit-action-renderer';
import { GridToolbar } from '../../../shared/components/grid-toolbar/grid-toolbar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataGrid, GridToolbar],
  selector: 'app-company',
  standalone: true,
  styleUrl: './company.scss',
  templateUrl: './company.html',
})
export class Company implements OnInit {
  @ViewChild(DataGrid) grid!: DataGrid<CompanyState>;

  pageState: PageState = {
    gridState: {
      companyGrid: { columnDefs: [], rowData: [] },
    },
  };

  ngOnInit(): void {
    this.bindGrid();
  }

  onAddCompany(): void {
    alert('Add');
  }

  onEditCompany(company: CompanyState): void {
    alert(company);
  }

  onSearchChange(value: string): void {
    this.grid.applyQuickFilter(value);
  }

  private bindGrid(): void {
    //define column
    this.pageState.gridState.companyGrid.columnDefs = [
      {
        field: 'companyName',
        filter: true,
        headerName: 'Company Name',
        minWidth: 200,
        sortable: true,
      },
      {
        cellRenderer: EditActionRenderer,
        cellRendererParams: {
          onEdit: (data: CompanyState) => this.onEditCompany(data),
          title: 'Edit Company',
        } as EditActionCellRendererParams,
        filter: false,
        getQuickFilterText: () => '',
        headerName: 'Action',
        maxWidth: 150,
        sortable: false,
      },
    ];

    //define row
    this.pageState.gridState.companyGrid.rowData = [
      { companyId: '1', companyName: 'Acme Corp', isActive: true },
      { companyId: '2', companyName: 'Globex Inc', isActive: true },
      { companyId: '3', companyName: 'Initech', isActive: true },
      { companyId: '4', companyName: 'Umbrella Corporation', isActive: true },
      { companyId: '5', companyName: 'Stark Industries', isActive: true },
      { companyId: '6', companyName: 'Wayne Enterprises', isActive: true },
      { companyId: '7', companyName: 'Wonka Industries', isActive: true },
      { companyId: '8', companyName: 'Cyberdyne Systems', isActive: true },
      { companyId: '9', companyName: 'Soylent Corp', isActive: true },
      { companyId: '10', companyName: 'Hooli', isActive: true },
      { companyId: '11', companyName: 'Massive Dynamic', isActive: true },
      { companyId: '12', companyName: 'Aperture Science', isActive: true },
      { companyId: '13', companyName: 'Oscorp Industries', isActive: true },
      { companyId: '14', companyName: 'Tyrell Corporation', isActive: true },
      { companyId: '15', companyName: 'Weyland-Yutani', isActive: true },
      { companyId: '16', companyName: 'Gekko & Co', isActive: true },
      { companyId: '17', companyName: 'Pied Piper', isActive: true },
      { companyId: '18', companyName: 'Vandelay Industries', isActive: true },
      { companyId: '19', companyName: 'Prestige Worldwide', isActive: true },
      { companyId: '20', companyName: 'Dunder Mifflin', isActive: true },
    ];
  }
}