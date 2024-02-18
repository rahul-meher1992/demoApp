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
  comments: any = [];
  postId!: number;

  constructor(private backendServicesService: BackendServicesService) { }

  ngOnInit(): void {
    this.getAllPostsData();
  };


  /**
  * 
  * @returns set of posts by calling the getPosts method in backend service and assigning that to posts variable
  */
  async getAllPostsData() {
    await this.backendServicesService.getPosts();
    this.posts = this.backendServicesService.postsData
  }


  /**
  * 
  * @param post to handle the button toggling and to handle the comments based on the particular post and showingComments (key);
  * 
  * At the very first time when we are calling get posts API immediately after that we are assigning two keys to th
  * object and setting the whole object to local storage .
  * Then we are checking if the data is not present in the local storage we are the the comments api and setting the
  * comments for the particular post into the comments array and changing the flag isComments to true and emitting the same
  * to comments component.
  * 
  * If the data is present in the localStorage we are not calling the api anymore , we are just getting the data from local 
  * storage for the particular post and emitting to the comment component.
  */
  async toggleData(post: any) {
    const selectedPost = this.posts.find((x: any) => x.id === post.id);
    this.posts.forEach(async (x: any) => {
      if (x.id == post.id) {
        x.showingComments = !x.showingComments;
        if (x.showingComments) {
          this.hideData(post)
        } else if (!selectedPost.isComments) {
          const commentsData = await this.backendServicesService.getCommentsById(post) || [];
          this.comments = commentsData;
          this.allCommentsData.emit(this.comments);
          selectedPost.comments = commentsData;
          selectedPost.isComments = true;
          //update local storage
          const localStorageData = localStorage.getItem('postsData');
          if (localStorageData) {
            const parsedData = JSON.parse(localStorageData);
            const updatedPostsData = parsedData.map((p: any) => {
              if (p.id === post.id) {
                return { ...p, comments: commentsData, isComments: true }
              }
              return p;
            })
            localStorage.setItem('postsData', JSON.stringify(updatedPostsData));
          }
        } else if (selectedPost.isComments && selectedPost.comments.length > 0) {
          const localData = localStorage.getItem('postsData');
          if (localData) {
            const localParsedData = JSON.parse(localData);
            const selectedPost = localParsedData.find((x: any) => x.id === post.id);
            if (selectedPost) {
              if (selectedPost.comments && selectedPost.comments.length > 0) {
                this.comments = selectedPost.comments;
                this.allCommentsData.emit(this.comments);
              }
            }
          }

        }
      }
    });
  }



  /**
   * 
   * @param post to get the comments here we are passing the particular post
   */

  // async getCommentsData(post: any) {
  //   var data: any = []
  //   data = await this.backendServicesService.getCommentsById(post) || [];
  //   this.comments = data;
  //   this.allCommentsData.emit(data);
  // }


  hideData(post: any) {
    // Do something
  }
}
