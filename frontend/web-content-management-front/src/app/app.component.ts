import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './header/header.component';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'web-content-management-front';
}
