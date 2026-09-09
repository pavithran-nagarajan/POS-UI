import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NgbTooltip, PlacementArray } from '@ng-bootstrap/ng-bootstrap';

export interface EditActionCellRendererParams extends ICellRendererParams {
  onEdit: (data: any) => void;
  title?: string; // optional override for tooltip
  placement?: PlacementArray; // optional override for tooltip placement
}

@Component({
  selector: 'app-edit-action-renderer',
  standalone: true,
  imports: [NgbTooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="btn btn-sm btn-outline-primary edit-btn"
      [ngbTooltip]="tooltipText"
      [placement]="placement"
      container="body"
      (click)="onClick()"
    >
      <i class="bi bi-pencil-square"></i>
    </button>
  `,
})
export class EditActionRenderer implements ICellRendererAngularComp {
  params!: EditActionCellRendererParams;
  tooltipText: string | undefined;
  placement: PlacementArray = 'top';

  agInit(params: EditActionCellRendererParams): void {
    this.params = params;
    this.tooltipText = params.title;
    this.placement = params.placement ?? 'top';
  }

  refresh(params: EditActionCellRendererParams): boolean {
    this.params = params;
    this.tooltipText = params.title;
    this.placement = params.placement ?? 'top';
    return true;
  }

  onClick(): void {
    this.params.onEdit(this.params.data);
  }
}