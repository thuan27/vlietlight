import { AssignmentService } from './assignment.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
  providers: [AssignmentService]
})
export class AssignmentComponent implements OnInit {

  list1 = [
    {value:0, name: 'name 0'},
    {value:1, name: 'name 1'},
    {value:2, name: 'name 2'},
    {value:3, name: 'name 3'},
  ]

  list2 = [
    {value:0, name: 'name 0'},
    {value:1, name: 'name 1'},
  ]

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private assignmentService: AssignmentService
    )
    {
    }

    ngOnInit()
    {
        // this.onBoardChanged =
        //     this.scrumboardService.onBoardChanged
        //         .subscribe(board => {
        //             this.board = board;
        //             console.log(board)
        //         });
    }

    drop(ev) {
      ev.preventDefault();
      console.log('--1--', ev.target)
      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
      console.log(data)
      console.log('--2--', ev.target)
    }

    allowDrop(ev) {
      ev.preventDefault();
    }

    drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    }

}
