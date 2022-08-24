import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public router:Router) { }

  seleccionado:any=sessionStorage.getItem("login");

  ngOnInit(): void {
    if(sessionStorage.getItem("login") == null) {
      this.router.navigate(['/login']);
      
    }
  }

}
