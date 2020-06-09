import { CreateUserService } from './create-user.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [ValidationService]
})
export class CreateUserComponent implements OnInit {

  items: FormArray;
  UserForm: FormGroup;
  ChildAWBFrom: FormGroup;
  titleGroup;
  status = [
    {
      value: 0,
      name: 'Accountant'
    },
    {
      value: 1,
      name: 'Admin'
    },
    {
      value: 2,
      name: 'Chief accountant'
    },
    {
      value: 3,
      name: 'Document'
    },
    {
      value: 4,
      name: 'Pickup'
    },
    {
      value: 5,
      name: 'Pre-alert'
    },
    {
      value: 6,
      name: 'Sales'
    },
    {
      value: 7,
      name: 'Superadmin'
    }
  ];

  constructor(
    private _createUserService: CreateUserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _Valid: ValidationService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.titleGroup = 'Registration';
  }

  private buildForm() {
    this.UserForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      username: [null, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      status: [0, [Validators.required]],
      password_hash: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.UserForm.valid) {

    }
    this._createUserService.createAWB(this.UserForm.value).subscribe((data) => {
      this.router.navigate(['apps/master-date/users']);
    });
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }


}
