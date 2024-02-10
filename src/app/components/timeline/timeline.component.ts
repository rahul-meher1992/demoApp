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
      this.posts = this.posts.map((obj:any)=>{
        return {...obj, showingComments:true}
      })
      console.log(this.posts);
     })
  }

  toggleData(post:any){
    post.showingComments = !post.showingComments;
    if(post.showingComments){
      this.fetchData(post)
    }else{
      this.hideData(post)
    }
  }

  fetchData(post:any){
    console.log(post.title)
  }

  hideData(post:any){
    console.log(post.title);
  }

}
