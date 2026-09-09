import { ColDef } from "ag-grid-community";

export interface PageState {
  companyState: CompanyState,
  gridState: {
    companyGrid: CompanyGridState;
  };
}

export interface CompanyState {

}

export interface CompanyGridState {
  columnDefs: ColDef[];
  rowData: any[];
}