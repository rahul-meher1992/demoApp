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
  * @returns set of posts from api it will call the api only once for the first time when we run the application
  * At first it will check the local storage if the data is present in the local storage it will get the data from local storage
  * else it will trigger the API  ..
  * 
  * once the API got triggered immediately it will store the data into local store
  */

  async getPosts() {
    try {

      const localStorageData = localStorage.getItem('postsData');
      if(localStorageData){
        this.postsData = JSON.parse(localStorageData);
      }else{
        const data = await this.appServicesService.getPostData().toPromise();
        this.postsData = data;
        const newData = this.postsData.map((obj:any)=>({...obj,isComments:false,comments:[]}))
        localStorage.setItem('postsData',JSON.stringify(newData)); 
      }  
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
