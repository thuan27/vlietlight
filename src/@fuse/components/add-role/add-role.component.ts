import { filter } from 'rxjs/operators';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Functions } from '@fuse/core/function';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddRoleService } from './add-role.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ToastyService } from '@fuse/directives/ng2-toasty';

@Component({
  selector: 'fuse-add-role-dialog',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
  providers: [AddRoleService]
})
export class FuseAddRoleComponent {
  formAdd: FormGroup;
  formSearch: FormGroup;
  roleCodeFilter:string = '';
  listSuggest;
  rows: any;
  selected: any[] = [];
  allRoles = [];
  loadingIndicator = false;
  reorderable = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FuseAddRoleComponent>,
    private toastyService: ToastyService,
    private addRoleService: AddRoleService
  ) {}

  ngOnInit() {
    this.rows = this.data['data'];
  }

  onSubmit() {
    this.dialogRef.close(this.selected)
  }

  searchRoleCode(value) {
    let isSearch = (data:any): boolean => {
      let isAll = false;
      if(typeof data === 'object' && typeof data['code'] !== 'undefined'){
        isAll = isSearch(data['code']);
      } else {
        if(typeof value === 'number'){
          isAll = data === value;
        } else {
          isAll = data.toString().match( new RegExp(value, 'i') );
        }
      }
      return isAll;
    };
    this.rows =  this.rows.filter(isSearch);
  }

}
