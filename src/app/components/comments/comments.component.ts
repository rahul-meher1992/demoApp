import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnChanges {
  @Input() comments: any[] = [];
  @Input() postId!: number;
  particularCommentData: any;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.comments || changes.postId) {
      this.filterComments();
    }
  }



  /**
  * 
  * @returns filtered data based on post id
  */

  filterComments() {
    this.particularCommentData = this.comments.filter(comment => comment.postId === this.postId);
  }

}
