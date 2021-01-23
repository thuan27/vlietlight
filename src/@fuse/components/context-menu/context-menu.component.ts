import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextComponent implements OnInit {
  @Input() x: number = 0;
  @Input() y: number = 0;
  @Input() isShow: boolean;
  @Input() name: string;
  constructor() { }

  ngOnInit() {
  }

  public copy(e): void {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = this.name;
    dummy.select();
    document.execCommand('copy');
  }

  public onUnLock(e): void {
    console.log('unlock');
  }
}
