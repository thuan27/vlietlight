import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Functions } from '@fuse/core/function';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DetailPickUpService } from './detail-pick-up.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ToastyService } from '@fuse/directives/ng2-toasty';
import { FuseAddRoleComponent } from '../add-role/add-role.component';

@Component({
  selector: 'fuse-detail-pick-up-dialog',
  templateUrl: './detail-pick-up.component.html',
  styleUrls: ['./detail-pick-up.component.scss'],
  providers: [DetailPickUpService]
})
export class FuseDetailPickUpComponent {
  listDetail = [];
  loadingIndicator = false;
  reorderable = true;
  validateID = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FuseAddRoleComponent>,
    private detailPickUpService: DetailPickUpService
  ) {}

  ngOnInit() {
    this.getDetailAssignment();
  }

  getDetailAssignment() {
    this.detailPickUpService.getDetailAssignment(this.data.data).subscribe((response) => {
      this.listDetail = response['wv_hdrs'];
    })
  }
}
