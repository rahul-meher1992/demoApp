import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input()isVisible!: boolean;
  @Output() close = new EventEmitter<void>();

  postControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.close.emit();
  }

}
