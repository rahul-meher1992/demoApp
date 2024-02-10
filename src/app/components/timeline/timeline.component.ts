import { Component, OnInit, Input } from '@angular/core';
import { AppServicesService } from '../../services/app-services.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  posts: any = [];

  constructor(private appServicesService: AppServicesService) { }

  ngOnInit(): void {
    //call the method from service file using HTTP Client
    this.appServicesService.getPostData().subscribe((data = []) => {
      this.posts = data
      this.posts = this.posts.map((obj: any) => {
        return { ...obj, showingComments: true } // Here assigning the key showingComments as true to every object when it get initialised
      })
    })
  }


  // Button toggling is happening and calling fetch data and hide data functions
  toggleData(post: any) {
    post.showingComments = !post.showingComments;
    if (post.showingComments) {
      this.hideData(post)
    } else {
      this.fetchData(post)
    }
  }


  // fetchData is calling comments api from service file by passing the postId 
  fetchData(post: any) {
    const postId = post.id
    this.appServicesService.getComments(postId).subscribe(comments=>{
      console.log(comments);
    })
  }

  hideData(post: any) {


  }
}
