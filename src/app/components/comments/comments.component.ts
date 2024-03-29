import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comments: any[] = [];
  @Input() postId!: number;
  particularCommentData: any;

  constructor() { }
  ngOnInit(): void {
      this.particularCommentData = this.comments;
      console.log(this.comments);
  }

}
