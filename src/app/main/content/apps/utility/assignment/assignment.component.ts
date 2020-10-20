import { AssignmentService } from './assignment.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseDetailPickUpComponent } from '@fuse/components/detail-pick-up/detail-pick-up.component';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { FuseDetailAssignmentComponent } from '@fuse/components/detail-assignment/detail-assignment.component';
@Component({
  selector: 'assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
  providers: [AssignmentService, ToastyService],
  animations : fuseAnimations
})
export class AssignmentComponent implements OnInit {

  searchForm: FormGroup;
  listAssignment;
  listSuggest;
  dialogRef;
  showLoadingBar = false;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        public dialog: MatDialog,
        private toastyConfig: ToastyConfig,
        private toastyService: ToastyService,
        private formBuilder: FormBuilder,
        private assignmentService: AssignmentService
    )
    {
      this.toastyConfig.position = 'top-right';
    }

    ngOnInit()
    {
      this.buildForm();
      this.getList();
      this.getListName();
        // this.onBoardChanged =
        //     this.scrumboardService.onBoardChanged
        //         .subscribe(board => {
        //             this.board = board;
        //             console.log(board)
        //         });
    }

    private buildForm() {
      this.searchForm = this.formBuilder.group({
        awb_code: '',
        customer_name: '',
        from_date: '',
        to_date: ''
      });
    }

    reset() {
      this.searchForm.controls['awb_code'].setValue('');
      this.searchForm.controls['customer_name'].setValue('');
      this.searchForm.controls['from_date'].setValue('');
      this.searchForm.controls['to_date'].setValue('');
      this.getList();
    }

    getList() {
      this.showLoadingBar = true;
      let param = '';
      param = '?' + 'awb_code=' + this.searchForm.value['awb_code']
        + '&' + 'customer_name=' + this.searchForm.value['customer_name'];
      if (this.searchForm.value['from_date'] != '') {
        param  = param + '&' + 'from_date=' + new Date(this.searchForm.value['from_date']).getTime();
      }
      if (this.searchForm.value['to_date'] != '') {
        param  = param + '&' + 'to_date=' + new Date(this.searchForm.value['to_date']).getTime();
      }
      this.assignmentService.getList(param).subscribe((data) => {
        this.listAssignment = data['data'];
        this.showLoadingBar = false;
      })
    }

    getListName() {
      let param = '';
      this.assignmentService.getListName(param).subscribe((data) => {
        this.listSuggest = data['data'];
      })
    }

    addAssignment(ev, item) {
      const data = {
        picker: ev.value.user_id
      }
      if (item.wv_sts == 'COMPLETED') {
        this.toastyService.error('Can not change picker when the status is COMPLETED');
      } else {
        this.assignmentService.saveAssignment(item.wv_hdr_id, data).subscribe((response) => {
          this.getList();
        })
      }
    }

    viewDetailAssignment(item) {
      this.dialogRef = this.dialog.open(FuseDetailPickUpComponent, {
        panelClass: 'contact-form-dialog',
        data      : {
            data: item.user_id,
            name: item.full_name
        }
      });
    }

    viewAssignmentDetail(item) {
      this.dialogRef = this.dialog.open(FuseDetailAssignmentComponent, {
        panelClass: 'contact-form-dialog',
        data      : {
            data: item.wv_hdr_id
        }
      });
    }

}
