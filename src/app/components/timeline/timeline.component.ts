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
  isPopupVisible = false;

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


  /**
  * 
  * @param post to handle the button toggling and to handle the comments based on the particular post and showingComments (key);
  * 
  * At the very first time when we are calling get posts API immediately after that we are assigning two keys to th
  * object and setting the whole object to local storage .
  * Then we are checking if the data is not present in the local storage we are calling the comments api and setting the
  * comments for the particular post into the comments array and changing the flag isComments to true and emitting the same
  * to comments component.
  * 
  * If the data is present in the localStorage we are not calling the api anymore , we are just getting the data from local 
  * storage for the particular post and emitting to the comment component.
  */

  async toggleData(post: any) {
    post.showingComments = !post.showingComments;
    const localStorageData:any = localStorage.getItem('postsData');
    const parsedData = JSON.parse(localStorageData);
    const selectedPost = parsedData.find((x: any) => x.id === post.id);
    if (selectedPost.comments && selectedPost.comments.length == 0) {
      const commentsData = await this.backendServicesService.getCommentsById(post) || [];
      if (commentsData) {
        this.comments = commentsData;
        this.allCommentsData.emit(this.comments);
        parsedData.map((x: any) => {
          if (x.id == post.id) {
            x.showingComments = true;
            x.comments = commentsData
          }
        });
        this.posts = parsedData;
        localStorage.setItem('postsData', JSON.stringify(parsedData));
      }
    } else {
      this.comments = selectedPost.comments;
      this.allCommentsData.emit(this.comments)
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

  editPost() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }
}
