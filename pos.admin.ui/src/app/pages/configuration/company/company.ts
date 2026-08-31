import { Component, ViewChild } from "@angular/core";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { SearchBox } from "../../../shared/components/search-box/search-box";
import { DataGrid } from "../../../shared/components/data-grid/data-grid";

interface companyGridState {
  columnDefs: ColDef[];
  rowData: any[];
}

interface pageData {
  gridData: {
    companyGrid: companyGridState;
  };
}

@Component({
  selector: "app-company",
  standalone: true,
  imports: [DataGrid, SearchBox],
  templateUrl: "./company.html",
  styleUrl: "./company.scss",
})
export class Company {
  @ViewChild(DataGrid) grid!: DataGrid;

  pageData: pageData = {
    gridData: {
      companyGrid: { columnDefs: [], rowData: [] },
    },
  };

  ngOnInit(): void {
    this.initPage();
    this.bindGrid();
  }

  private initPage(): void {
    this.pageData = {
      gridData: {
        companyGrid: { columnDefs: [], rowData: [] }
      }
    };
  }

  private bindGrid(): void {
    //define column
    this.pageData.gridData.companyGrid.columnDefs = [
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
        getQuickFilterText: () => "",
        cellRenderer: (params: ICellRendererParams) => {
          const wrapper = document.createElement("span");
          wrapper.innerHTML = `
          <button class="action-btn edit-btn" title="Edit">✏️</button>
        `;
          wrapper
            .querySelector(".edit-btn")
            ?.addEventListener("click", () => this.onEdit(params.data));
          return wrapper;
        },
      },
    ];

    //define row
    this.pageData.gridData.companyGrid.rowData = [
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
  }

  onEdit(company: any) {
    console.log("Edit company:", company);
  }

  onSearchChange(value: string) {
    this.grid.applyQuickFilter(value);
  }
}