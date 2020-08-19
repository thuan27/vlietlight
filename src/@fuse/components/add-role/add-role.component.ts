import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Functions } from '@fuse/core/function';
import { MatDialog } from '@angular/material';
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
  dialogRef: any;
  listSuggest;
  allRoles = [];
  private selectedAll = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastyService: ToastyService,
    private addRoleService: AddRoleService
  ) {}

  ngOnInit() {
    this.buildSearchForm();
    this.getLogedUserRoles();
  }

  onSubmit(value) {
    // this.addRoleService
    //   .updatePickUp(this.data['data'][0]['wv_hdr_id'], value)
    //   .subscribe(
    //     res => {
    //       this.toastyService.success('Successfully');
    //     },
    //     err => {
    //       this.toastyService.warning(err.errors.message);
    //     }
    //   );
  }

  private buildSearchForm() {
    this.formSearch = this.formBuilder.group({
      role: ['']
    });
  }

  onSuggest() {
    // let params = '';
    // params =
    //   params +
    //   '?first_name=' +
    //   this.formSearch.controls['first_name'].value +
    //   '&last_name=' +
    //   this.formSearch.controls['last_name'].value +
    //   '&email=' +
    //   this.formSearch.controls['email'].value;
    //   this.addRoleService.getsugesstion(params).subscribe(res => {
    //   this.listSuggest = res['data'];
    // });
  }

  getLogedUserRoles() {
    this.addRoleService.getLogedUserRoles().subscribe(res => {
      this.allRoles = res['data'];
    });
  }

  reset() {
    this.formSearch.controls['first_name'].setValue('');
    this.formSearch.controls['last_name'].setValue('');
    this.formSearch.controls['email'].setValue('');
    this.listSuggest = [];
  }

  CheckAll(event, ListName:string, StatePagin, objName) {

    let Array = eval(`this.` + ListName);

    if (!Array.length) {
      this.selectedAll[ListName] = false;
      return;
    }
    if (event) {
      // console.log('')
      this.selectedAll[ListName] = true;
    }
    else {
      this.selectedAll[ListName] = false;
    }

    //console.log('List checkall from ',StatePagin ,  StatePagin[objName]['start'] , ' to ' , StatePagin[objName]['end']);
    let end = StatePagin[objName]['end'];
    if (StatePagin[objName]['size'] < StatePagin[objName]['end']) {
      end = StatePagin[objName]['size'];
    }
    //console.log('end -> ' , end);
    for (let i = StatePagin[objName]['start']; i < end; i++) {
      //console.log(' i ' , i ,  Array[i]);
      Array[i]['selected'] = this.selectedAll[ListName];
    }
  }

  Selected($event, item, ListName:string, state, paginId) {

    let Array = eval(`this.` + ListName);
    this.selectedAll[ListName] = false;

    if ($event.target.checked) {
      item['selected'] = true;
      this.checkCheckAll(ListName, state, paginId);
    }
    else {
      item['selected'] = false;
    }
  }

  checkCheckAll(ListName:string, StatePagin, objName) {
    let Array = eval(`this.` + ListName);
    // console.log('StatePagin > ', StatePagin);
    let el = StatePagin[objName];
    let end = el['end'];
    let chk = 0;
    // console.log('check check all');

    if (el['size']) {

      if (el['size'] < el['end']) {
        end = el['size'];
      }

      for (let i = el['start']; i < end; i++) {
        // console.log('i ' , i , Array[i]['selected']);
        if (Array[i]['selected']) {
          chk++;
        }
      }
      if (chk == el['slice'].length) {
        this.selectedAll[ListName] = true;
      }
      else {
        this.selectedAll[ListName] = false;
      }

      // console.log('check all of list ' , ListName ,  this.selectedAll[ListName] );
    } // end if size
  }
}
