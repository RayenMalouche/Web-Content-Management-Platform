import { Injectable } from '@angular/core';
import {ILayout} from '../models/ILayout';
import {BehaviorSubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private layoutSubject = new BehaviorSubject<ILayout>({
    backgroundColor: '', borderColor: '', height: '', width: '',
    name: "home",
    code: "home",
    description: "",
    type: "ROUTABLE",
    status: "ACTIVE"
  });
  layout$ = this.layoutSubject.asObservable();

  updateLayout(newLayout: ILayout) {
    this.layoutSubject.next(newLayout);
  }
}
