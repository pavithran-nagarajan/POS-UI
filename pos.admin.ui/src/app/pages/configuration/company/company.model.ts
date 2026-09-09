import { ColDef } from "ag-grid-community";

interface CompanyGridState {
  columnDefs: ColDef<CompanyState>[];
  rowData: CompanyState[];
}

export interface PageState {
  gridState: {
    companyGrid: CompanyGridState;
  };
}

export interface CompanyState {
  companyId: string;
  companyName: string;
  isActive: boolean;
}

