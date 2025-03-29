import { Component, OnDestroy } from '@angular/core';
import { ILayout } from '../models/ILayout';
import { INode } from '../models/INode';
import {Observable, Subject} from 'rxjs';
import { WIDGET_ID } from '../constants/WIDGET_ID';
import { LayoutService } from '../services/layoutservice.service';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { OriginListComponent } from '../origin-list/origin-list.component';
import { LayoutComponent } from '../layout/layout.component';
import { OptionsComponent } from '../options/options.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [ OriginListComponent, LayoutComponent, OptionsComponent],
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy {
  private currentDraggableEvent?: DragEvent;
  private currentDragEffectMsg?: string;
  private _selectedNode = new Subject<INode>();
  private selectedList: INode[] | undefined = undefined;
  selectedNode$ = this._selectedNode.asObservable();
  lastSelectedNode: INode | null = null;
  isLastSelectedNodeRoot = false;

  root: INode = {
    name: "Layout",
    type: "row",
    selected: false,
    children: [
      { name: "Header", type: "widget", selected: false, description: "first", widgetId: WIDGET_ID.header, children: [] },
      {
        name: "Column", type: "column", selected: false, children: [
          { name: "Image Slider", type: "widget", selected: false, widgetId: WIDGET_ID.imageSlider, children: [] },
          { name: "Description", type: "widget", selected: false, widgetId: WIDGET_ID.text, children: [] },
        ]
      },
      { name: "Footer", type: "widget", selected: false, widgetId: WIDGET_ID.footer, children: [] }
    ]
  };

  layout$: Observable<ILayout>;

  constructor(private layoutService: LayoutService) {
    this.layout$ = this.layoutService.layout$;
  }


  onDragStart(event: DragEvent) {
    this.currentDragEffectMsg = '';
    this.currentDraggableEvent = event;
  }

  onDragged(payload: { event: DragEvent, effect: DropEffect, node: INode, list?: INode[] }) {
    this.currentDragEffectMsg = `Drag ended with effect "${payload.effect}"!`;
    if (payload.effect === 'move' && payload.list) {
      const index = this.findNodeIndexInList(payload.node, payload.list);
      if (index >= 0) payload.list.splice(index, 1);
    }
  }

  onDragEnd(event: DragEvent) {
    this.currentDraggableEvent = event;
  }

  onDrop(payload: { event: DndDropEvent, list?: INode[] }) {
    if (payload.list && (payload.event.dropEffect === 'copy' || payload.event.dropEffect === 'move')) {
      let index = payload.event.index;
      if (typeof index === 'undefined') index = payload.list.length;
      payload.list.splice(index, 0, payload.event.data);
      this.clearSelection();
      this.onNodeSelected({ node: payload.event.data as INode, isRoot: false, list: payload.list });
    }
  }

  onRemove(payload: { node: INode, list: INode[] }) {
    const index = this.findNodeIndexInList(payload.node, payload.list);
    if (index >= 0) payload.list.splice(index, 1);
    this.clearSelection();
  }

  onNodeSelected(payload: { node: INode, isRoot: boolean, list?: INode[] }) {
    if (this.lastSelectedNode) this.lastSelectedNode.selected = false;
    payload.node.selected = true;
    this.lastSelectedNode = payload.node;
    this._selectedNode.next(payload.node);
    this.isLastSelectedNodeRoot = payload.isRoot;
    this.selectedList = payload.list;
  }

  onNodeSave(payload: { oldNode: INode, newNode: INode, isRoot: boolean }) {
    if (payload.isRoot) {
      this.root = payload.newNode;
    } else {
      const index = this.findNodeIndexInList(payload.oldNode, this.selectedList);
      if (index >= 0 && this.selectedList) {
        this.selectedList[index] = payload.newNode;
      }
    }
    this.onNodeSelected({ node: payload.newNode, isRoot: payload.isRoot, list: this.selectedList });
  }

  findNodeIndexInList(node: INode, list: INode[] | undefined): number {
    return list ? list.indexOf(node) : -1;
  }

  clearSelection() {
    this.lastSelectedNode = null;
    this.selectedList = undefined;
    this._selectedNode.next(null as any);
    this.unselectAllFromTree(this.root);
  }

  unselectAllFromTree(tree: INode) {
    tree.selected = false;
    tree.children.forEach(child => this.unselectAllFromTree(child));
  }

  onSaveLayout(newLayout: ILayout) {
    this.layoutService.updateLayout(newLayout);
  }

  ngOnDestroy(): void {
    this._selectedNode.complete();
  }
}
