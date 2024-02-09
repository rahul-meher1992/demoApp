import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appTitleHighlighter]'
})
export class TitleHighlighterDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // Apply styles to the title element when the directive is initialized  
    this.setStyle();
  }

  private setStyle(){
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-weight', 'bold');
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'black');
  }

}
