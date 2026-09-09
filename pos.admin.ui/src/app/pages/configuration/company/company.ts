import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { GridToolbar } from '../../../shared/components/grid-toolbar/grid-toolbar';
import { DataGrid } from '../../../shared/components/data-grid/data-grid';
import {
  EditActionRenderer,
  EditActionCellRendererParams,
} from '../../../shared/components/grid-action-buttons/edit-action-renderer/edit-action-renderer';
import { CompanyState, PageState } from './company.model';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [DataGrid, GridToolbar],
  templateUrl: './company.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './company.scss',
})
export class Company implements OnInit {
  @ViewChild(DataGrid) grid!: DataGrid<CompanyState>;

  pageState: PageState = {
    gridState: {
      companyGrid: { columnDefs: [], rowData: [] },
    },
  };

  ngOnInit(): void {
    this.initPage();
    this.bindGrid();
  }

  private initPage(): void { }

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
          onEdit: (data: CompanyState) => this.onEditCompany(data),
          title: 'Edit Company',
        } as EditActionCellRendererParams,
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

  onEditCompany(company: CompanyState): void {
    alert(company);
  }

  onSearchChange(value: string): void {
    this.grid.applyQuickFilter(value);
  }

  onAddCompany(): void {
    alert('Add');
  }
}