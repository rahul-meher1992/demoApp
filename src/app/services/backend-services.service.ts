import { Injectable } from '@angular/core';
import { AppServicesService } from '../services/app-services.service';

@Injectable({
  providedIn: 'root'
})
export class BackendServicesService {

  postsData: any = [];

  constructor(private appServicesService: AppServicesService) { }


  /**
  * 
  * @returns set of posts by calling the getPostData method from app-services
  */

  async getPosts() {
    try {
      const data = await this.appServicesService.getPostData().toPromise();
      this.postsData = data;
      this.postsData = this.postsData.map((obj: any) => ({ ...obj, showingComments: true }));
    } catch (error) {
      console.error(error);
    }
  }


  

  /**
   * 
   * @param post 
   * @returns 
   */
  async getCommentsById(post: any) {
    try {
      const postId = post.id;
      const comData = await this.appServicesService.getComments(postId).toPromise();
      return comData
    } catch (error) {
      console.error(error)
      return 
    }

  }
}
