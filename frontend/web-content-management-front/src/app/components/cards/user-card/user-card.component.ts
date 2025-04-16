import {Component, Input} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faEdit, faTrash, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-card',
  imports: [
    FaIconComponent
  ],
  templateUrl: './user-card.component.html',
  standalone: true,
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: any;

  protected readonly faTrash = faTrash;
  protected readonly faEdit = faEdit;
  protected readonly faUser = faUser;

  onDelete() {

  }

  onEdit() {

  }
}
