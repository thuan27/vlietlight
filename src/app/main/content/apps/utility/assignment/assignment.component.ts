import { AssignmentService } from './assignment.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';
@Component({
  selector: 'assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
  providers: [AssignmentService],
  animations : fuseAnimations
})
export class AssignmentComponent implements OnInit {

  list1 = [
    {value:0, name: 'name 0'},
    {value:1, name: 'name 1'},
    {value:2, name: 'name 2'},
    {value:3, name: 'name 3'},
  ]

  list2 = [
    {value:4, name: 'name 4', title: 'test'},
    {value:5, name: 'name 5', title: 'test'},
    {value:6, name: 'name 6', title: 'test'},
    {value:7, name: 'name 7', title: 'test'},
    {value:8, name: 'name 8', title: 'test'},
    {value:9, name: 'name 9', title: 'test'},
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

    // drop(ev) {
    //   ev.preventDefault();
    //   var data = ev.dataTransfer.getData("text");
    //   ev.target.appendChild(document.getElementById(data));
    //   console.log('1',ev)

    // }

    // allowDrop(ev) {
    //   ev.preventDefault();

    // }

    // drag(ev) {
    //   ev.dataTransfer.setData("text", ev.target.id);
    //   console.log('2',ev)
    // }

    onDrop(ev) {
      console.log(ev)
      console.log(this.list1)
      console.log(this.list2)
    }

    over(ev) {
      console.log('--over---',ev)
      console.log(this.list1)
    }

    drop(ev) {
      console.log('--drop---',ev)
      console.log(this.list1)
    }


}
