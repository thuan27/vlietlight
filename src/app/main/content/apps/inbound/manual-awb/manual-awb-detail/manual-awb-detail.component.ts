import { transition } from '@angular/animations';
import { ManualAWBDetailService } from './manual-awb-detail.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from '../../../../../../../environments/environment';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { Subscription } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'manual-awb-detail',
  templateUrl: './manual-awb-detail.component.html',
  styleUrls: ['./manual-awb-detail.component.scss'],
  providers: [
    ValidationService, ToastyService
  ],
})
export class ManualAWBDetailComponent implements OnInit {

  awb_details: FormArray;
  AWBForm: FormGroup;
  ChildAWBFrom: FormGroup;
  private routeSub: Subscription;
  country;
  isENVELOP = false;
  status;
  numberShow = 20;
  doc_type = '';
  doc_type_cus = '';
  action;
  rows = [];
  private idAWB;
  buttonCancel;
  disabledForm;
  buttonType;
  title;
  awbDetail;
  eventTracking;
  loadingIndicator= true;
  filesDetail;
  limitEvent = 20;
  dialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  showList = [
    {
      value: 20,
      name: 20,
    },
    {
      value: 30,
      name: 30,
    },
    {
      value: 40,
      name: 40,
    },
    {
      value: 50,
      name: 50,
    },
  ]
  itemType = [
    {
      value: 0,
      name: 'ENVELOP'
    },
    {
      value: 1,
      name: 'DOC'
    },
    {
      value: 2,
      name: 'PACK'
    }
  ];
  IsYesNo = [
    {
      value: 0,
      name: 'No'
    },
    {
      value: 1,
      name: 'Yes'
    },
  ]

  constructor(
    private _ManualAWBDetailService: ManualAWBDetailService,
    private formBuilder: FormBuilder,
    private toastyService: ToastyService,
    private router: Router,
    private _Valid: ValidationService,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog,
    private location: Location,
    private toastyConfig: ToastyConfig

  ) {
    this.toastyConfig.position = 'top-right';
  }

  ngOnInit() {
    this.buildForm();
    this.getStatus();
    this.defaultPage();
  }

  defaultPage() {
    this.routeSub = this.activeRoute.params.subscribe(params => {
      console.log(params)
      if (params['id'] !== undefined) {
        if (params['update']  === 'update') {
          this.action = 'update';
          this.idAWB = params['id'];
          this.detail(params['id']);
          this.disabledForm = false;
          this.buttonType = 'Update';
          this.title = 'Update Manual AWB';
          this.buttonCancel = 'Cancel'
          // this.titleGroup = 'Update';
        } else {
          this.idAWB = params['id'];
          this.action = 'detail';
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Manual AWB Details';
          this.buttonCancel = 'Cancel'
          // this.titleGroup = 'Detail';
        }
      }
      else {
        this.action = 'create';
        // this.titleGroup = 'Registration';
        this.title = 'Create Manual AWB';
        this.buttonType = 'Create';
        this.disabledForm = false;
        this.buttonCancel = 'Back';
      }
    });
  }

  async detail(id) {
    await this._ManualAWBDetailService.getAWB(id).subscribe((data) => {
      this.awbDetail = data['data'];
      this.detailForm(data['data']);
      this.rows = data['data']['user_roles'];
      this.loadingIndicator = false;
    });
  }

  private detailForm(data) {
    this.doc_type = 'png';
    this.AWBForm = this.formBuilder.group({
      awb_code: [''],
      awb_sts: [''],
      account_number: [''],
      cus_id: [''],
      cus_address: [''],
      awb_name: [''],
      sales_id: [''],
      cs_id: [''],
      pickup_note_for_sales: [''],
      sales_note: [''],
      cs_note: [''],
      created_at: [''],
      updated_at: [''],
      created_by: [''],
      sales_note_for_cs: ['']
    });
  }

  private buildForm() {
    this.AWBForm = this.formBuilder.group({
      awb_code: [''],
      awb_sts: [''],
      account_number: [''],
      cus_id: [''],
      cus_address: [''],
      awb_name: [''],
      sales_id: [''],
      cs_id: [''],
      pickup_note_for_sales: [''],
      sales_note: [''],
      cs_note: [''],
      created_at: [''],
      updated_at: [''],
      created_by: [''],
      sales_note_for_cs: ['']
    });
  }

  onSubmit() {
    if (this.AWBForm.valid) {
      if (this.action === 'create') {
        this.AWBForm.value.received_at = this.AWBForm.value.received_at.format('YYYY/MM/DD');
        this.AWBForm.value.ship_date = this.AWBForm.value.ship_date.format('YYYY/MM/DD');
        this.AWBForm.value.pick_up_date = this.AWBForm.value.pick_up_date.format('YYYY/MM/DD');
        this._ManualAWBDetailService.createAWB(this.AWBForm.value).subscribe((data) => {
          this.router.navigate(['apps/inbound/awb']);
        });
      } else if (this.action === 'update') {
        this._ManualAWBDetailService.updateAWB(this.AWBForm.value, this.idAWB).subscribe((data) => {
          this.router.navigate(['apps/inbound/awb']);
        });
      }
    }
  }

  getCountry(event, optionId, optionName) {
    this.AWBForm.controls[optionId].setValue(null);
    this.AWBForm.controls[optionName].setErrors({'invalid_Country' : true})
    this._ManualAWBDetailService.getCountry(event.target.value).subscribe((data) => {
      this.country = data['data'];
    });
  }

  addEvent(event: any) {}

  changeItem(event: any, i) {
  }

  cancel() {
    this.location.back();
  }

  getStatus() {
    this._ManualAWBDetailService.getStatus().subscribe((data) => {
        this.status = data['data'];
    });
  }

}
