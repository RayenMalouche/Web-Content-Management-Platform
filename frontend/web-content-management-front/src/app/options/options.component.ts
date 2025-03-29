import {Component, EventEmitter, Input, Output} from '@angular/core';
import {root} from 'postcss';
import {INode} from '../models/INode';
import {ILayout} from '../models/ILayout';
import {Observable} from 'rxjs';
import {JsonPipe} from '@angular/common';
import {NodeDetailsComponent} from '../node-details/node-details.component';
import {LayoutDetailsComponent} from '../layout-details/layout-details.component';

@Component({
  selector: 'app-options',
  imports: [
    JsonPipe,
    NodeDetailsComponent,
    LayoutDetailsComponent
  ],
  templateUrl: './options.component.html',
  standalone: true,
  styleUrl: './options.component.scss'
})
export class OptionsComponent {
  @Input() selectedNode$: Observable<INode> | undefined;
  @Input() root: INode | undefined;
  @Input() layout$: Observable<ILayout> | undefined;
  @Input() selectedNodeIsRoot = false;
  @Output() saveNode = new EventEmitter<{ oldNode: INode, newNode: INode, isRoot: boolean }>();
  @Output() saveLayout = new EventEmitter<ILayout>();
}
