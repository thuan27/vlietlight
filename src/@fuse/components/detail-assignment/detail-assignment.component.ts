import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Functions } from '@fuse/core/function';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DetailAssignmentService } from './detail-assignment.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ToastyService } from '@fuse/directives/ng2-toasty';
import { FuseAddRoleComponent } from '../add-role/add-role.component';

@Component({
  selector: 'fuse-detail-assignment-dialog',
  templateUrl: './detail-assignment.component.html',
  styleUrls: ['./detail-assignment.component.scss'],
  providers: [DetailAssignmentService]
})
export class FuseDetailAssignmentComponent {
  listDetail;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FuseAddRoleComponent>,
    private detailAssignmentService: DetailAssignmentService
  ) {}

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this.detailAssignmentService.getDetail(this.data.data).subscribe((response) => {
      this.listDetail = response['data'];

    })
  }
}
