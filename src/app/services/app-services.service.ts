import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppServicesService {

  //Define API end point below
  apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  //Method to call the API
  getPostData(){
    //make post request to api url
    return this.http.get(`${this.apiUrl}/posts`);
  }


   /**
    * 
    * @returns set of posts by passing api url to fetch method if there is any issue in response it will
    *  throw error or else it will give us the data as a response 
    */
  getPosts(){
    return fetch(`${this.apiUrl}/posts`).then(response=>{
      if(!response.ok){
        throw new Error('Network issue')
      }
      return response.json();
    }).then(data=>{
      return data;
    }).catch(error=>{
      console.error('There is a problem with fetch')
    });
  }


 /**
  * 
  * @returns set of posts by passing the api endpoint inside the get method by using axios 
  */
  getData():Observable<any> {
    return new Observable(observer =>{
      axios.get('https://jsonplaceholder.typicode.com/posts').then(response=>{
        observer.next(response.data);
        observer.complete();
      }).catch(error=>{
        observer.error(error);
      });
    });
  }

   /**
  * 
  * @returns set of comments to that particular posts by passing the post id
  */

   getComments(postId:number){
    return this.http.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
   }
}
