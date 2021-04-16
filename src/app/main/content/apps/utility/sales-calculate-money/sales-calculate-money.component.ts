import { Router } from '@angular/router';
import { SalesCalculateMoneyService } from './sales-calculate-money.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Functions } from '@fuse/core/function';
import { ValidationService } from '@fuse/core/validator';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'sales-calculate-money',
    templateUrl: './sales-calculate-money.component.html',
    styleUrls: ['./sales-calculate-money.component.scss'],
    providers: [SalesCalculateMoneyService, ToastyService, ValidationService]
})
export class SalesCalculateMoneyComponent implements OnInit {
  CalculateForm: FormGroup;
  serviceName;
  type = [
    {
      value: 0,
      name: 'Document'
    },
    {
      value: 1,
      name: 'Pack'
    }
  ];
  cusCountryZone;
  rangeWeight;
  serviceWeightRange;
  loadingService: boolean = false;

  constructor(
    private salesCalculateMoneyService: SalesCalculateMoneyService,
    private formBuilder: FormBuilder,
    private toastyService: ToastyService,
    private router: Router,
    private _Valid: ValidationService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
  }

  ngOnInit() {
    this.buildForm();
    this.getCusRangPrice();
  }

  private buildForm() {
    this.CalculateForm = this.formBuilder.group({
      cus_service_id: [undefined, [Validators.required]],
      service_id_example: [0, [Validators.required]],
      zone_example: ['', [Validators.required]],
      cus_range_price: [0, [Validators.required]],
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

  getService(event) {
    this.loadingService = true;
    let data = '';
    if (event.target.value) {
      data = data + '?cus_service_name=' + event.target.value;
    }
    this.salesCalculateMoneyService.getService(data).subscribe((data) => {
      this.serviceName = data['data'];
      this.loadingService = false;
    }, error => {
      this.loadingService = false;
    });
  }

  displayService(id) {
    if (this.serviceName) {
      return this.serviceName.find(service => service.cus_service_id === id).cus_service_name;
    }
  }

  onChangeAutoComplete() {
    if (this.CalculateForm.value['cus_service_id']) {
      const service_id = this.CalculateForm.value['cus_service_id'];
      this.getCusRangPrice(service_id);
      this.getServiceWeightRange(service_id);
    }
  }

  getCusRangPrice(cusServiceID = '') {
    this.salesCalculateMoneyService.getCusRangPrice(cusServiceID).subscribe((data)=> {
      this.rangeWeight = data['data']
    })
  }

  getCusCountryZone(event) {
    let data = '?' + this.CalculateForm.value['cus_service_id'];
    if (event.target.value) {
      data = data + '&cus_service_name=' + event.target.value;
    }
    this.salesCalculateMoneyService.getCusCountryZone(data).subscribe((data) => {
      this.cusCountryZone = data['data'];
    });
  }

  onChangeZone(cusCountryZone) {
    this.CalculateForm.controls['zone'].setValue(cusCountryZone.zone);
  }

  getServiceWeightRange(cusServiceID) {
    this.salesCalculateMoneyService.getServiceWeightRange(cusServiceID).subscribe((data)=> {
      this.serviceWeightRange = data['data']
    })
  }
}
