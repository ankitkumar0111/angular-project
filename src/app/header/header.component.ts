import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  changeHeader: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if the user is logged in (you may have your own logic for this)
    const loggedIn = sessionStorage.getItem('loggedIn');
    this.changeHeader = !loggedIn;
  }

  logout() {
    // Perform logout logic here
    // For example, clear session storage and navigate to home page
    sessionStorage.setItem('loggedIn', 'false');
    this.router.navigate(['/home']); // Assuming '/' is your home route
    this.changeHeader = true; // Change the header after logout
  }
}
