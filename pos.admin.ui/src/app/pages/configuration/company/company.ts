import { Component } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { environment } from "../../../../environments/environment";
import {
  ClientSideRowModelModule,
  ColDef,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
  ModuleRegistry,
  PaginationModule,
  TextFilterModule,
  CellStyleModule,
  enableDevValidations,
  themeQuartz,
} from "ag-grid-community";

if (environment.production == false) {
  enableDevValidations();
}

ModuleRegistry.registerModules([
  PaginationModule,
  ClientSideRowModelModule,
  TextFilterModule,
  CellStyleModule,
]);

@Component({
  selector: "app-company",
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: "./company.html",
  styleUrl: "./company.scss",
})
export class Company {
  private gridApi!: GridApi;

  theme = themeQuartz;

  columnDefs: ColDef[] = [
    {
      field: "companyName",
      headerName: "Company Name",
      minWidth: 200,
      sortable: true,
      filter: true,
      cellClassRules: {
        "sorted-col-cell": (params) => params.column.getSort() != null,
      },
    },
    {
      headerName: "Action",
      width: 120,
      sortable: false,
      filter: false,
      cellRenderer: (params: ICellRendererParams) => {
        const wrapper = document.createElement("span");
        wrapper.innerHTML = `
          <button class="action-btn view-btn" title="View">👁️</button>
          <button class="action-btn edit-btn" title="Edit">✏️</button>
        `;
        wrapper
          .querySelector(".view-btn")
          ?.addEventListener("click", () => this.onView(params.data));
        wrapper
          .querySelector(".edit-btn")
          ?.addEventListener("click", () => this.onEdit(params.data));
        return wrapper;
      },
    },
  ];

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  rowData: any[] = [
    { id: 1, companyName: "Acme Corp" },
    { id: 2, companyName: "Globex Inc" },
    { id: 3, companyName: "Initech" },
    { id: 4, companyName: "Umbrella Corporation" },
    { id: 5, companyName: "Stark Industries" },
    { id: 6, companyName: "Wayne Enterprises" },
    { id: 7, companyName: "Wonka Industries" },
    { id: 8, companyName: "Cyberdyne Systems" },
    { id: 9, companyName: "Soylent Corp" },
    { id: 10, companyName: "Hooli" },
    { id: 11, companyName: "Massive Dynamic" },
    { id: 12, companyName: "Aperture Science" },
    { id: 13, companyName: "Oscorp Industries" },
    { id: 14, companyName: "Tyrell Corporation" },
    { id: 15, companyName: "Weyland-Yutani" },
    { id: 16, companyName: "Gekko & Co" },
    { id: 17, companyName: "Pied Piper" },
    { id: 18, companyName: "Vandelay Industries" },
    { id: 19, companyName: "Prestige Worldwide" },
    { id: 20, companyName: "Dunder Mifflin" },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onView(company: any) {
    console.log("View company:", company);
  }

  onEdit(company: any) {
    console.log("Edit company:", company);
  }
}