import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './shared/header/header.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    HeaderComponent,
  ],
  standalone: true
})
export class AppComponent {
  title = 'website-builder';
}
