import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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
}
