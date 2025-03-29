import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './header.component';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  standalone: true
})
export class AppComponent {
  title = 'website-builder';
}
