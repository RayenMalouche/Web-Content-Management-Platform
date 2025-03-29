import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { Observable, Subject, takeUntil, tap } from "rxjs";
import {ILayout} from '../models/ILayout';
import {AsyncPipe, NgIf} from '@angular/common';


@Component({
  selector: 'app-layout-details',
  templateUrl: './layout-details.component.html',
  styleUrls: ['./layout-details.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutDetailsComponent implements OnInit, OnDestroy {
  @Input() layout$: Observable<ILayout> | undefined;
  @Output() save = new EventEmitter<ILayout>();

  layoutFinal$: Observable<ILayout> | undefined;
  destroy$ = new Subject<void>();
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    description: new FormControl(''),
    type: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    // @ts-ignore
    this.layoutFinal$ = this.layout$.pipe(
      takeUntil(this.destroy$),
      tap(layout => {
        if (layout) {
          this.form.patchValue({
            name: layout.name,
            code: layout.code,
            description: layout?.description,
            type: layout.type,
            status: layout.status
          });
        }
      })
    )
  }

  onSave() { return {...this.form.value} as unknown as ILayout; }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
