import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  standalone: true,
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: any;

}
