import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbTooltip, PlacementArray } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface EditActionCellRendererParams<TData = unknown> extends ICellRendererParams {
  onEdit: (data: TData) => void;
  placement?: PlacementArray; // optional override for tooltip placement
  title?: string; // optional override for tooltip
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgbTooltip],
  selector: 'app-edit-action-renderer',
  standalone: true,
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
export class EditActionRenderer<TData = unknown> implements ICellRendererAngularComp {
  params!: EditActionCellRendererParams<TData>;
  placement: PlacementArray = 'top';
  tooltipText: string | undefined;

  agInit(params: EditActionCellRendererParams<TData>): void {
    this.params = params;
    this.tooltipText = params.title;
    this.placement = params.placement ?? 'top';
  }

  onClick(): void {
    this.params.onEdit(this.params.data as TData);
  }

  refresh(params: EditActionCellRendererParams<TData>): boolean {
    this.params = params;
    this.tooltipText = params.title;
    this.placement = params.placement ?? 'top';
    return true;
  }
}