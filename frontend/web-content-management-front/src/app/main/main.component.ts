import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ILayout } from '../models/ILayout';
import { INode } from '../models/INode';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { OriginListComponent } from '../origin-list/origin-list.component';
import { LayoutComponent } from '../layout/layout.component';
import { OptionsComponent } from '../options/options.component';
import { LayoutService } from '../services/layout-service.service';
import { HttpClientModule } from '@angular/common/http';
import { NodeService } from '../services/node-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [OriginListComponent, LayoutComponent, OptionsComponent, HttpClientModule, RouterModule],
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private _selectedNode = new Subject<INode>();
  private _layoutSubject = new BehaviorSubject<ILayout | null>(null);
  private selectedList: INode[] | undefined = undefined;
  private lastSelectedNode: INode | null = null;

  selectedNode$ = this._selectedNode.asObservable();
  layout$ = this._layoutSubject.asObservable().pipe(filter(layout => layout !== null)) as Observable<ILayout>;
  isLastSelectedNodeRoot = false;

  root: INode = {
    id: '',
    name: "Layout",
    type: "row",
    selected: false,
    children: [],
    template: false,
  };

  constructor(
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private nodeService: NodeService,
  ) {}

  ngOnInit(): void {
    this.initializeLayout();
  }

  ngOnDestroy(): void {
    this._selectedNode.complete();
  }

  private initializeLayout(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.route.paramMap.pipe(
        switchMap(params => {
          const layoutId = params.get('id');
          return layoutId ? this.layoutService.getLayoutById(layoutId) : new Observable<ILayout>();
        })
      ).subscribe(layout => {
        this.root = layout?.nodes?.[0] || this.createDefaultLayout(id);
        this._layoutSubject.next(layout);
      }, error => console.error('Erreur lors de la récupération du layout:', error));
    } else {
      console.error('ID de layout non trouvé dans l\'URL');
    }
  }

  private createDefaultLayout(id: string): INode {
    return {
      id,
      name: "Default Layout",
      type: "row",
      selected: false,
      children: [],
      template: false,
    };
  }

  onDragStart(event: DragEvent): void {}

  onDragged(payload: { event: DragEvent, effect: DropEffect, node: INode, list?: INode[] }): void {
    if (payload.effect === 'move' && payload.list) {
      const index = this.findNodeIndexInList(payload.node, payload.list);
      if (index >= 0) payload.list.splice(index, 1);
    }
  }

  onDragEnd(event: DragEvent): void {}

  onDrop(payload: { event: DndDropEvent, list?: INode[] }): void {
    if (payload.list && (payload.event.dropEffect === 'copy' || payload.event.dropEffect === 'move')) {
      const index = payload.event.index ?? payload.list.length;
      const newNode = { ...payload.event.data, id: this.generateUniqueId(), template: false };
      const parentNode = payload.list.find(node => node.id === payload.event.data.parent?.id);

      if (parentNode) {
        parentNode.children.splice(index, 0, newNode);
        this.updateNode(parentNode);
      } else {
        payload.list.splice(index, 0, newNode);
      }

      this.clearSelection();
      this.onNodeSelected({ node: newNode, isRoot: false, list: payload.list });
      this.updateLayout();
    }
  }

  private updateNode(node: INode): void {
    this.nodeService.updateNode(node.id, node).subscribe(
      response => console.log('Nœud parent mis à jour avec succès', response),
      error => console.error('Erreur lors de la mise à jour du nœud parent', error)
    );
  }

  private updateLayout(): void {
    const updatedLayout: ILayout = {
      id: this.root.id,
      name: this.root.name,
      type: "SECTION",
      description: this.root.description || '',
      nodes: this.root.children,
      borderColor: this.root.borderColor || '',
      backgroundColor: this.root.backgroundColor || '',
      height: this.root.height || '',
      width: this.root.width || '',
      code: 'someCode',
      status: 'ACTIVE'
    };

    this.updateNodes(updatedLayout.nodes);
    this.layoutService.updateLayout(updatedLayout.id, updatedLayout).subscribe(
      response => console.log('Layout mis à jour avec succès', response),
      error => console.error('Erreur lors de la mise à jour du layout', error)
    );
  }

  private updateNodes(nodes: INode[]): void {
    nodes.forEach(node => {
      if (!node.template) {
        this.nodeService.updateNode(node.id, node).subscribe(
          response => response ? console.log('Nœud mis à jour avec succès', response) : this.createNode(node),
          error => console.error('Erreur lors de la mise à jour du nœud', error)
        );
        if (node.children?.length) {
          this.updateNodes(node.children);
        }
      }
    });
  }

  private createNode(node: INode): void {
    this.nodeService.createNode(node).subscribe(
      response => console.log('Nœud créé avec succès', response),
      error => console.error('Erreur lors de la création du nœud', error)
    );
  }

  onRemove(payload: { node: INode, list: INode[] }): void {
    const index = this.findNodeIndexInList(payload.node, payload.list);
    if (index >= 0) {
      this.nodeService.deleteNode(payload.node.id).subscribe(
        () => {
          console.log('Nœud supprimé avec succès');
          payload.list.splice(index, 1);
          this.clearSelection();
          this.updateLayout();
        },
        error => console.error('Erreur lors de la suppression du nœud', error)
      );
    }
  }

  onNodeSelected(payload: { node: INode, isRoot: boolean, list?: INode[] }): void {
    if (this.lastSelectedNode) this.lastSelectedNode.selected = false;
    payload.node.selected = true;
    this.lastSelectedNode = payload.node;
    this._selectedNode.next(payload.node);
    this.isLastSelectedNodeRoot = payload.isRoot;
    this.selectedList = payload.list;
  }

  onNodeSave(payload: { oldNode: INode, newNode: INode, isRoot: boolean }): void {
    if (payload.isRoot) {
      this.root = payload.newNode;
    } else {
      const index = this.findNodeIndexInList(payload.oldNode, this.selectedList);
      if (index >= 0 && this.selectedList) {
        this.selectedList[index] = payload.newNode;
      }
    }
    this.onNodeSelected({ node: payload.newNode, isRoot: payload.isRoot, list: this.selectedList });

    this.nodeService.updateNode(payload.newNode.id, payload.newNode).subscribe(
      response => {
        console.log('Nœud mis à jour avec succès', response);
        this.updateLayout();
      },
      error => console.error('Erreur lors de la mise à jour du nœud', error)
    );
  }
  private findNodeIndexInList(node: INode, list: INode[] | undefined): number {
    return list ? list.indexOf(node) : -1;
  }

  private clearSelection(): void {
    this.lastSelectedNode = null;
    this.selectedList = undefined;
    this._selectedNode.next(null as any);
    this.unselectAllFromTree(this.root);
  }

  private unselectAllFromTree(tree: INode): void {
    tree.selected = false;
    tree.children.forEach(child => this.unselectAllFromTree(child));
  }

  onSaveLayout(newLayout: ILayout): void {
    this.layoutService.updateLayout(newLayout.id, newLayout).subscribe();
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
