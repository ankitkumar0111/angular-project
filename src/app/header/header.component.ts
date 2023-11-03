import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  changeHeader: boolean = true;
  dropdownOpen : boolean = false;
  constructor(private route: Router) { }
 
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      // to check if url is not undefined
      if (val.url) {
        if(val.url==='/login' ){
        this.changeHeader=true;
        console.log(val.url);
        console.log(this.changeHeader);
        }else{
          this.changeHeader=false;
          // console.log(val.url);
          // console.log(this.changeHeader);
        }
      }
     
    })

}

toggleMenu(){
  this.dropdownOpen = !this.dropdownOpen;
}

showDropdown(){
  this.dropdownOpen = true;
}

hideDropdown(){
  this.dropdownOpen = false
}
}
