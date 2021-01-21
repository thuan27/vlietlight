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
  constructor() { }

  ngOnInit() {
    console.log('---------')
  }

  public onLock(e): void {
    e.toElement.select();
    document.execCommand('copy');
    console.log('lock');
  }

  public onUnLock(e): void {
    console.log('unlock');
  }
}
