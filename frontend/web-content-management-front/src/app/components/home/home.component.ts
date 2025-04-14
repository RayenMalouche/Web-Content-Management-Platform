import { Component } from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
}
