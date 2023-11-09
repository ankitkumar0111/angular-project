import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck {

  changeHeader: boolean = false;

  constructor(private router: Router) {}

  ngDoCheck() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    this.changeHeader =!loggedIn
    console.log(this.changeHeader,"change");
    
  }


  
  
  logout() {
    sessionStorage.removeItem('loggedIn');
    this.router.navigate(['/home']); 
    this.changeHeader = true; 
  }
}
