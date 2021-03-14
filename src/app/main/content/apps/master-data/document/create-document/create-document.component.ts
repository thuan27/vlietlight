import { Subscription } from 'rxjs/Subscription';
import { CreateDocumentService } from './create-document.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyConfig, ToastyService } from '@fuse/directives/ng2-toasty';
import { Location } from '@angular/common';
import { UserService } from '@fuse/directives/users/users.service';
import { Functions } from '@fuse/core/function';

@Component({
  selector: 'create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss'],
  providers: [ValidationService, ToastyService, UserService]
})
export class CreateDocumentComponent implements OnInit {

  items: FormArray;
  DocumentForm: FormGroup;
  idDocument;
  DocumentDetail;
  private routeSub: Subscription;
  disabledForm = false;
  title;
  buttonSubmitType;
  buttonCancel;
  action;
  titleGroup;
  service;
  hasEditUserPermission = false;
  hasCreateUserPermission = false;
  hasDeleteUserPermission = false;
  private hasViewUserPermission = false;

  constructor(
    private _createDocumentService: CreateDocumentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _Valid: ValidationService,
    private activeRoute: ActivatedRoute,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private _user: UserService,
    private _Func: Functions,
    private location: Location
  ) {
    this.toastyConfig.position = 'top-right';
   }

  ngOnInit() {
    this.title = 'Create Range Price';
    this.titleGroup = 'Registration';
    this.buttonSubmitType = 'Create';
    this.buttonCancel = 'Cancel'
    this.checkPermission();
    this.buildForm();
  }

  defaultPage() {
    this.activeRoute.data.subscribe((data) => {
      this.action = data.Action
    })
    this.routeSub = this.activeRoute.params.subscribe(params => {
      if (params['id'] !== undefined) {
        if (this.action  === 'update' && this.hasEditUserPermission) {
          this.idDocument = params['id'];
          this.detail(params['id']);
          this.disabledForm = false;
          this.buttonSubmitType = 'Update';
          this.title = 'Update Document';
          this.titleGroup = 'Update';
        } else {
          this.idDocument = params['id'];
          this.detail(params['id']);
          this.disabledForm = true;
          this.title = 'Document Details';
          this.titleGroup = 'Detail';
          this.buttonCancel = 'Back';
        }
      }
      else if (this.hasCreateUserPermission) {
        this.titleGroup = 'Registration';
        this.title = 'Create Document';
        this.buttonSubmitType = 'Create';
        this.disabledForm = false;
      }
    });
  }

  // Check permission for user using this function page
  private checkPermission() {
    this._user.GetPermissionUser().subscribe(
        data => {
            this.hasEditUserPermission = this._user.RequestPermission(data, 'editPrice');
            this.hasCreateUserPermission = this._user.RequestPermission(data, 'createPrice');
            this.hasDeleteUserPermission = this._user.RequestPermission(data, 'deletePrice');
            this.hasViewUserPermission = this._user.RequestPermission(data,'viewPrice');
            /* Check orther permission if View allow */
            if(!this.hasViewUserPermission) {
                this.router.navigateByUrl('pages/landing');
            } else {
              this.defaultPage();
            }
        },
        err => {
            this.toastyService.error(err.error.errors.message);
        }
    );
  }

  private buildForm() {
    this.DocumentForm = this.formBuilder.group({
      document_name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      link: ['', [Validators.required]]
    });
  }

  private detailForm(data) {
    this.DocumentForm = this.formBuilder.group({
      document_name: [data['service_id'], [Validators.required]],
      description: [data['range_code'], [Validators.required]],
      link: [data['range_code'], [Validators.required]]
    });
  }

  onSubmit() {
    if (this.DocumentForm.valid) {
      if (this.action === 'create') {
        this._createDocumentService.createDocument(this.DocumentForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/document']);
            },
            700
          ), err => {
            this.toastyService.error(err.error.errors.message);
          };
        });
      } else if (this.action === 'update') {
        this._createDocumentService.updateDocument(this.idDocument, this.DocumentForm.value).subscribe((data) => {
          this.toastyService.success(data['message']);
          setTimeout(
            () => {
              this.router.navigate(['apps/master-data/document']);
            },
            700
          );
        }, err => {
          this.toastyService.error(err.error.errors.message);
        });
      }

    }
  }

  detail(id) {
    this._createDocumentService.getDocumentDetail(id).subscribe((data) => {
      this.DocumentDetail = data['range_price'];
      this.detailForm(data['range_price']);
    });
  }

  cancel() {
    this.location.back();
  }
}
