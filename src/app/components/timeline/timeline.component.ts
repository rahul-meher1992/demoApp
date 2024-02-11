import { Component, OnInit, Input } from '@angular/core';
import { BackendServicesService } from '../../services/backend-services.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  posts: any = [];

  constructor(private backendServicesService: BackendServicesService) { }

  ngOnInit(): void {
    this.getAllPostsData();
  };


  // calling the getPosts method from backend service to get the data;
  async getAllPostsData(){
    await this.backendServicesService.getPosts();
    this.posts = this.backendServicesService.postsData
  }


  // Button toggling is happening and calling fetch data and hide data functions
  toggleData(post: any) {
    post.showingComments = !post.showingComments;
    if (post.showingComments) {
      this.hideData(post)
    } else {
      this.backendServicesService.getCommentsById(post); 
    }
  }


  hideData(post: any) {
    // Do something
  }
}
