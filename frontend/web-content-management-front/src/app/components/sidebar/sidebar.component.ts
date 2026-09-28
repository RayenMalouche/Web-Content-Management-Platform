import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHome, faGlobe, faDatabase, faFolder, faUser, faSignOutAlt, faUsers, IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

interface MenuItem {
  id: string;
  label: string;
  letter: string;
  icon: IconDefinition;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  faUser = faUser;
  protected readonly faSignOutAlt = faSignOutAlt;

  // Each entry is a routed page (see app.routes.ts). "Components" and
  // "Settings" were listed before but had no page behind them.
  readonly menu: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', letter: 'A', icon: faHome },
    { id: 'websites', label: 'My Websites', letter: 'B', icon: faGlobe },
    { id: 'projects', label: 'My Projects', letter: 'C', icon: faFolder },
    { id: 'databases', label: 'My Databases', letter: 'D', icon: faDatabase },
    { id: 'users', label: 'Users Management', letter: 'E', icon: faUsers },
  ];

  activeMenuItem = 'dashboard';

  userName: string = 'Guest';
  userRole: string = 'User';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserInfo();
    // Sub-pages light up the section they belong to.
    const parents: Record<string, string> = { 'database-editor': 'databases', 'pages-list': 'websites', project: 'projects' };
    const segment = this.router.url.split(/[/?#]/)[1];
    const section = parents[segment] ?? segment;
    if (this.menu.some((m) => m.id === section)) {
      this.activeMenuItem = section;
    }
  }

  setActiveMenuItem(item: string) {
    this.activeMenuItem = item;
    this.router.navigate([`/${item}`]);
  }

  loadUserInfo(): void {
    const currentUser = localStorage.getItem('current_user');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userName = user.name || 'Unknown User';
      this.userRole = user.role || 'User';
    }
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']).then(r => console.log('Redirected to login'));
  }
}
