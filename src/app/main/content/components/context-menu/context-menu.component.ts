import { Component, Input, OnInit } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'fuse-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls  : ['./context-menu.component.scss'],
})
export class ContextMenuComponent implements OnInit {
  @Input() x = 0;
  @Input() y = 0;
  @Input() isShow: boolean;
  @Input() content = null;
  @Input() element;
  span = document.querySelector('span');
  xMenuContext = 0;
  yMenuContext = 0;
  constructor() { }

  ngOnInit() {
    this.xMenuContext = $('.nav-group').width();
    this.yMenuContext = $('#form-control').height();
    // document.addEventListener('copy', function(e){
    //   document.clipboardData.setData('text/plain', 'foo');
    // //   e.preventDefault(); // default behaviour is to copy any selected text
    // });
  }

  onCopy(event): void {
    // const copyText = this.content.getElementById("myInput");
    // console.log(copyText);
      
      // this.content.select();
      // this.content.setSelectionRange(0, 99999)
      // document.execCommand("copy");


    // console.log(this.content);
    // console.log(this.content.getElementsByTagName('span'));
    // // console.log(this.content);
    // // // this.content.select();
    // // console.log(this.content.innerText);
    // // window.clipboardData.setData ('Text', this.content.innerText);
    // // // document.execCommand('copy',false);
    // // const selection = document.getSelection();
    // document.clipboardData.setData('text/plain', 'Copy function: ' + selection.toString().toUpperCase() );
    // event.preventDefault();
  }



}
