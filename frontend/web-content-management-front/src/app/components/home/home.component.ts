import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  standalone: true
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // You can add initialization logic here if needed
  }

  // This method can be used for smooth scrolling to page sections
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Method to navigate to login page
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Method to navigate to signup page
  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
