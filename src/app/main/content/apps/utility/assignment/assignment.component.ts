import { AssignmentService } from './assignment.service';
import { Component, OnInit } from '@angular/core';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScrumboardService } from '../../scrumboard/scrumboard.service';
import { List } from '../../scrumboard/list.model';
import { Location } from '@angular/common';
import { Board } from '../../scrumboard/board.model';
@Component({
  selector: 'assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
  providers: [ValidationService]
})
export class AssignmentComponent implements OnInit {

  board: any;
  onBoardChanged: Subscription;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private scrumboardService: ScrumboardService
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

    // ngOnDestroy()
    // {
    //     this.onBoardChanged.unsubscribe();
    // }

    // onListAdd(newListName)
    // {
    //     if ( newListName === '' )
    //     {
    //         return;
    //     }

    //     this.scrumboardService.addList(new List({name: newListName}));
    // }

    // onBoardNameChanged(newName)
    // {
    //     this.scrumboardService.updateBoard();
    //     this.location.go('/apps/scrumboard/boards/' + this.board.id + '/' + this.board.uri);
    // }

    // onDrop(ev)
    // {
    //     this.scrumboardService.updateBoard();
    // }

}
