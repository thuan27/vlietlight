import { CalculateMoneyService } from './calculate-money.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormGroupDirective } from '@angular/forms';
import { ValidationService } from '@fuse/core/validator';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';

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
  @ViewChild('formDirective') formDirective: FormGroupDirective;
  serviceName;
  type = [
    {
      value: 1,
      name: 'Document'
    },
    {
      value: 2,
      name: 'Pack'
    }
  ];
  countryZone;
  rangeWeight;
  serviceWeightRange;
  loading: boolean = false;
  result;

  constructor(
    private calculateMoneyService: CalculateMoneyService,
    private formBuilder: FormBuilder,
    private toastyService: ToastyService,
    private _Valid: ValidationService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.CalculateForm = this.formBuilder.group({
      service_id: [null, [Validators.required]],
      service_id_example: [0, [Validators.required]],
      zone_example: [''],
      rangeId: [null],
      reweight: [null, [Validators.required]],
      zone: [null, [Validators.required]],
      type: [1, [Validators.required]]
    });
  }

  onSubmit(event) {
    this.result = null;
    let params;
    if (this.CalculateForm.valid) {
      this.loading = true;
      if (event.submitter.name === 'calculate') {
        params = '?service_id=' + this.CalculateForm.value['service_id']
          + '&reweight=' + this.CalculateForm.value['reweight']
          + '&rangeId=' + this.CalculateForm.value['rangeId']
          + '&zone=' + this.CalculateForm.value['zone']
          + '&type=' + this.CalculateForm.value['type'];
        this.calculateMoneyService.calculateMoney(params).subscribe((response) => {
          this.result = response['net_price']
          this.loading = false;
          this.CalculateForm.reset();
          this.formDirective.resetForm();
          this.serviceName = undefined;
        }, err=> {
          this.loading = false;
          this.result = 'Không tìm thấy kết quả.'
        })
      } else {
        params = '?service_id=' + this.CalculateForm.value['service_id']
          + '&weight=' + this.CalculateForm.value['reweight']
          + '&zone=' + this.CalculateForm.value['zone']
          + '&type=' + this.CalculateForm.value['type'];
        this.calculateMoneyService.calculateMoneyAuto(params).subscribe((response) => {
          this.result = response['net_price']
          this.CalculateForm.reset();
          this.formDirective.resetForm();
          this.serviceName = undefined;
          this.loading = false;
        }, err=> {
          this.loading = false;
          this.result = 'Không tìm thấy kết quả.'
        })
      }
    }
  }

  checkInputNumber($event, int) {
    this._Valid.isNumber($event, int);
  }

  getService(event) {
    this.loading = true;
    let data = '';
    if (event.target.value) {
      data = data + '?service_name=' + event.target.value;
    }
    this.calculateMoneyService.getService(data).subscribe((data) => {
      this.serviceName = data['data'];
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  displayService(id) {
    if (this.serviceName) {
      return this.serviceName.find(service => service.service_id === id).service_name;
    }
  }

  onChangeAutoComplete() {
    if (this.CalculateForm.value['service_id']) {
      const service_id = this.CalculateForm.value['service_id'];
      this.getRangePrice(service_id);
      this.getServiceWeightRange(service_id);
      this.CalculateForm.controls['reweight'].setValue(null);
      this.CalculateForm.controls['zone'].setValue(null);
      this.CalculateForm.controls['type'].setValue(1);
      this.CalculateForm.controls['rangeId'].setValue(null);
      this.CalculateForm.controls['zone_example'].setValue('');
      this.CalculateForm.controls['service_id_example'].setValue(0);
    }
  }

  getRangePrice(cusServiceID = '') {
    this.loading = true;
    this.calculateMoneyService.getRangePrice(cusServiceID).subscribe((data)=> {
      this.rangeWeight = data['data']
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  getCountryZone(event) {
    let data = '?service_id=' + this.CalculateForm.value['service_id'];
    if (event.target.value) {
      data = data + '&country_name=' + event.target.value;
    }
    this.loading = true;
    this.calculateMoneyService.getCountryZone(data).subscribe((data) => {
      this.countryZone = data['data'];
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  onChangeZone(countryZone) {
    this.CalculateForm.controls['zone'].setValue(countryZone.zone);
  }

  getServiceWeightRange(serviceID) {
    this.loading = true;
    this.calculateMoneyService.getServiceWeightRange(serviceID).subscribe((data)=> {
      this.serviceWeightRange = data['data']
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }
}
