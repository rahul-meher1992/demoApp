import { Component, OnInit } from '@angular/core';
import {AppServicesService} from '../../services/app-services.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts:any = []

  constructor(private appServicesService:AppServicesService) { }

  ngOnInit(): void {

    //call the method from service file
    this.appServicesService.getPostData().subscribe((data = [])=>{
      this.posts = data;
      console.log(this.posts);
    })
    
  }
  

}
