import { Component, OnInit } from '@angular/core';
import {AppServicesService} from '../../services/app-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts:any = []

  constructor(private appServicesService:AppServicesService) { }

  ngOnInit(): void {

    //call the method from service file using HTTP Client
    this.appServicesService.getPostData().subscribe((data = [])=>{
      this.posts = data;
      console.log('API Call using HTTP Client',this.posts);
    });


    //call the method from service file using fetch
    this.appServicesService.getPosts().then((data:any[])=>{
      this.posts = data;
      console.log('API Call using Fetch',this.posts);
    }).catch(error=>{
      console.log('Error facing while fetching',error)
    })

    //Call the method from service using axios
    this.appServicesService.getData().subscribe((data: any[])=>{
      this.posts = data;
      console.log('API Call using axios',this.posts)
    },(error)=>{
      console.log('Error while fetching',error);
    })
    
  }
  

}
