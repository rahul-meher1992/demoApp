import { Component, OnInit } from '@angular/core';
import {AppServicesService} from '../../services/app-services.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  posts:any =[]

  constructor(private appServicesService:AppServicesService) { }

  ngOnInit(): void {
     //call the method from service file using HTTP Client
     this.appServicesService.getPostData().subscribe((data= [])=>{
      this.posts = data
      console.log(this.posts)
     })
    
  }

}
