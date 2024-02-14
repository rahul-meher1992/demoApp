import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BackendServicesService } from '../../services/backend-services.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  @Output() allCommentsData = new EventEmitter<any[]>();

  posts: any = [];
  comments:any = [];
  postId!: number;

  constructor(private backendServicesService: BackendServicesService) { }

  ngOnInit(): void {
    this.getAllPostsData();
  };


  /**
  * 
  * @returns set of posts by calling the getPosts method in backend service and assigning that to posts variable
  */
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
       this.getCommentsData(post);
    }
  }

  /**
   * 
   * @param post to get the comments here we are passing the particular post
   */

  async getCommentsData(post: any){
    var data:any = []
    data = await this.backendServicesService.getCommentsById(post) || [];
    this.comments = data;
    this.allCommentsData.emit(data);
  }


  hideData(post: any) {
    // Do something
  }
}
