import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProjectService } from '../../../services/project-service.service';
import { GenericListComponent } from '../../generic-list/generic-list.component';
import { ProjectCardComponent } from '../../cards/project-card/project-card.component';
import { CreateProjectModalComponent } from '../../modals/create-project-modal/create-project-modal.component';
import { CommonModule } from '@angular/common';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import {SidebarComponent} from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss'],
  standalone: true,
  imports: [
    GenericListComponent,
    ProjectCardComponent,
    CreateProjectModalComponent,
    CommonModule,
    FaIconComponent,
    FormsModule,
    SidebarComponent
  ]
})
export class ProjectsViewComponent implements OnInit {
  projects$: Observable<any[]> = of([]);
  filteredProjects: any[] = [];
  searchTerm: string = '';
  @ViewChild('createProjectModal') createProjectModal: any;

  private allProjects: any[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projects$ = this.projectService.getProjects();
    this.projects$.subscribe(projects => {
      this.allProjects = projects;
      this.filteredProjects = projects;
    });
  }

  filterProjects() {
    if (!this.searchTerm) {
      this.filteredProjects = this.allProjects;
    } else {
      this.filteredProjects = this.allProjects.filter(project =>
        project.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  openCreateProjectModal() {
    this.createProjectModal.open();
  }

  onCreateProjectModalClose() {
    this.createProjectModal.close();
  }

  onProjectCreate(project: any) {
    this.projectService.createProject(project).subscribe(() => {
      this.projects$ = this.projectService.getProjects();
      this.projects$.subscribe(projects => {
        this.allProjects = projects;
        this.filterProjects();
      });
    });
    this.createProjectModal.close();
  }

  onProjectDelete(id: string) {
    this.projectService.deleteProject(id).subscribe(() => {
      this.projects$ = this.projectService.getProjects();
      this.projects$.subscribe(projects => {
        this.allProjects = projects;
        this.filterProjects();
      });
    });
  }

  protected readonly faPlus = faPlus;
  protected readonly faSearch = faSearch;
}
