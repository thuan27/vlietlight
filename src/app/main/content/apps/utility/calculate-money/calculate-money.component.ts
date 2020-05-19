import { CalculateMoneyService } from './calculate-money.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'calculate-money',
  templateUrl: './calculate-money.component.html',
  styleUrls: ['./calculate-money.component.scss'],
  providers: [ValidationService]
})
// tslint:disable-next-line:component-class-suffix
export class CalculateMoneyComponent implements OnInit {

  CalculateForm: FormGroup;
  group1 = [
    {
      value: 0,
      name: 'test'
    }
  ];

  group2 = [
    {
      value: 0,
      name: 'test1'
    }
  ];

  group3 = [
    {
      value: 0,
      name: 'test2'
    }
  ];

  group4 = [
    {
      value: 0,
      name: 'test3'
    }
  ];

  group5 = [
    {
      value: 0,
      name: 'test4'
    }
  ];

  constructor(
    private _calculateMoneyService: CalculateMoneyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _Valid: ValidationService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.CalculateForm = this.formBuilder.group({
      service_id: [0, [Validators.required]],
      service_id_example: [0, [Validators.required]],
      zone_example: [0, [Validators.required]],
      rangeId: [0, [Validators.required]],
      reweight: ['', [Validators.required]],
      zone: ['', [Validators.required]],
      type: [0, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.CalculateForm.valid) {

    }
    // this._createCustomerService.createCustomer(this.CustomerForm.value).subscribe((data) => {
    //   this.router.navigate(['apps/master-date/users']);
    // });
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }


}
