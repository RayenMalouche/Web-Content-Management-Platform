import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GenericListComponent } from '../../generic-list/generic-list.component';
import { UserCardComponent } from '../../cards/user-card/user-card.component';
import { CreateUserModalComponent } from '../../modals/create-user-modal/create-user-modal.component';
import { CommonModule } from '@angular/common';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import {SidebarComponent} from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss'],
  standalone: true,
  imports: [
    GenericListComponent,
    UserCardComponent,
    CreateUserModalComponent,
    CommonModule,
    FaIconComponent,
    FormsModule,
    SidebarComponent
  ]
})
export class UsersViewComponent implements OnInit {
  users$: Observable<any[]> = of([]);
  filteredUsers: any[] = [];
  searchTerm: string = '';
  @ViewChild('createUserModal') createUserModal: any;

  private allUsers: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users$ = this.userService.getAllUsers()
    this.users$.subscribe(users => {
      this.allUsers = users;
      this.filteredUsers = users;
    });
  }

  filterUsers() {
    if (!this.searchTerm) {
      this.filteredUsers = this.allUsers;
    } else {
      this.filteredUsers = this.allUsers.filter(user =>
        user.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  openCreateUserModal() {
    this.createUserModal.open();
  }

  onCreateUserModalClose() {
    this.createUserModal.close();
  }

  onUserCreate(user: any) {
    this.userService.createUser(user).subscribe(() => {
      this.users$ = this.userService.getAllUsers()
      this.users$.subscribe(users => {
        this.allUsers = users;
        this.filterUsers();
      });
    });
    this.createUserModal.close();
  }

  onUserDelete(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      this.users$ = this.userService.getAllUsers()
      this.users$.subscribe(users => {
        this.allUsers = users;
        this.filterUsers();
      });
    });
  }

  protected readonly faPlus = faPlus;
  protected readonly faSearch = faSearch;
}
