import { Component, OnInit,Input  } from '@angular/core';
import {AppServicesService} from '../../services/app-services.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  posts:any =[];

  constructor(private appServicesService:AppServicesService) {}

  ngOnInit(): void {
     //call the method from service file using HTTP Client
     this.appServicesService.getPostData().subscribe((data= [])=>{
      this.posts = data
      this.posts.forEach((obj:any) => {
        obj.showButtonVisible = true;
        obj.hideButtonVisible = false;
      });
      console.log(this.posts)
     })
  }

  toggleButtons(index: number): void {
    const post = this.posts[index];
    // console.log(post)
    if(post.showButtonVisible){
      post.showButtonVisible = false;
      post.hideButtonVisible = true
    }else{
      post.showButtonVisible = true;
      post.hideButtonVisible = false
    }
  }
}
