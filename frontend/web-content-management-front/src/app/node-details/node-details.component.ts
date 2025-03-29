import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject, takeUntil, tap} from 'rxjs';
import {INode} from '../models/INode';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {WIDGET_ID_LIST} from '../constants/WIDGET_ID_LIST';

@Component({
  selector: 'app-node-details',
  imports: [
    NgIf,
    ReactiveFormsModule,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './node-details.component.html',
  standalone: true,
  styleUrl: './node-details.component.scss'
})
export class NodeDetailsComponent implements OnInit, OnDestroy {
  @Input() selectedNode$: Observable<INode> | undefined;
  @Input() selectedNodeIsRoot = false;
  @Output() save = new EventEmitter<{ oldNode: INode, newNode: INode, isRoot: boolean }>();

  WIDGET_ID_LIST = WIDGET_ID_LIST;
  selectedNodeFinal$: Observable<INode> | undefined;
  destroy$ = new Subject<void>();
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    childrenCount: new FormControl(0),
    description: new FormControl(),
    widgetId: new FormControl(),
  })

  ngOnInit(): void {
    this.selectedNodeFinal$ = this.selectedNode$?.pipe(
      takeUntil(this.destroy$),
      tap(node => {
        if (node) {
          this.form.patchValue({
            name: node.name,
            type: node.type,
            childrenCount: node.children.length ?? 0,
            description: node?.description ?? null,
            widgetId: node?.widgetId ?? null,
          })
        }
      })
    )
  }

  onSave(node: INode) {
    const newNode: INode = {
      ...node,
      name: this.form.value?.name ?? '',
      type: this.form.value?.type as 'row' | 'column' | 'widget' ?? 'widget',
      description: this.form.value?.description,
      widgetId: this.form.value?.widgetId,
      children: node.children,
      selected: node.selected
    };

    this.save.emit({
      oldNode: node,
      newNode: newNode,
      isRoot: this.selectedNodeIsRoot
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
