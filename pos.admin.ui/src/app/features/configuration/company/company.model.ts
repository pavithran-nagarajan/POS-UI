import { type ColDef } from "ag-grid-community";

export interface CompanyState {
  companyId: string;
  companyName: string;
  isActive: boolean;
}

export interface PageState {
  gridState: {
    companyGrid: CompanyGridState;
  };
}

interface CompanyGridState {
  columnDefs: ColDef<CompanyState>[];
  rowData: CompanyState[];
}