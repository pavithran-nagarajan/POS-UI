import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

export interface EditActionCellRendererParams extends ICellRendererParams {
  onEdit: (data: any) => void;
  title?: string; // optional override for tooltip
}

@Component({
  selector: "app-edit-action-renderer",
  standalone: true,
  template: `
    <button
      type="button"
      class="btn btn-sm btn-outline-primary edit-btn"
      [title]="params.title || 'Edit'"
      (click)="onClick()"
    >
      <i class="bi bi-pencil-square"></i>
    </button>
  `,
})
export class EditActionRenderer implements ICellRendererAngularComp {
  params!: EditActionCellRendererParams;

  agInit(params: EditActionCellRendererParams): void {
    this.params = params;
  }

  refresh(params: EditActionCellRendererParams): boolean {
    this.params = params;
    return true;
  }

  onClick(): void {
    this.params.onEdit(this.params.data);
  }
}