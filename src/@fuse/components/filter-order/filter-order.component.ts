import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FilterOrderService } from './filter-order.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FuseAddRoleComponent } from '../add-role/add-role.component';

@Component({
  selector: 'fuse-filter-order-dialog',
  templateUrl: './filter-order.component.html',
  styleUrls: ['./filter-order.component.scss'],
  providers: [FilterOrderService]
})
export class FuseFilterOrderComponent {
  searchForm: FormGroup;
  status;
  dataCS;
  country;
  serviceName;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FuseAddRoleComponent>,
    private filterOrderService: FilterOrderService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.searchForm = this.formBuilder.group({
      account_number: this.data.data.value['account_number'],
      odr_status: this.data.data.value['odr_status'],
      awb_num: this.data.data.value['awb_num'],
      cus_name: this.data.data.value['cus_name'],
      order_id: this.data.data.value['order_id'],
      out_awb_num: this.data.data.value['out_awb_num'],
      cus_total_price: this.data.data.value['cus_total_price'],
      to_country_id: [this.data.data.value['to_country_id'],[this.validateCountry]],
      picker: this.data.data.value['picker'],
      user_id: this.data.data.value['user_id'],
      cs_id: this.data.data.value['cs_id'],
      sales_note_for_cs: this.data.data.value['sales_note_for_cs'],
      service_id: this.data.data.value['service_id'],
      item_id: this.data.data.value['item_id'],
      zone_id: this.data.data.value['zone_id'],
    });
  }

  getCountry(event) {
    let data = '';
    if (event.target.value) {
      data = data + '&country_name=' + event.target.value;
    }
    this.filterOrderService.getCountry(data).subscribe((data) => {
      this.country = data['data'];
    });
  }

  displayCountry(id) {
    if (this.country) {
      return this.country.find(country => country.country_id === id).country_name;
    }
  }

  validateCountry(control: FormControl) {
    if (typeof control.value == 'number' || control.value === '') {
      return null;
    } else {
      return { 'hasnotCountry': true };
    }
  }

  getCS(event) {
    let data = '';
    if (event.target.value) {
      data = data + '?full_name=' + event.target.value;
    }
    this.filterOrderService.getCS(data).subscribe((data) => {
      this.dataCS = data['data'];
    });
  }

  displayCS(id) {
    if (this.dataCS) {
      return this.dataCS.find(dataCS => dataCS.user_id === id).full_name;
    }
  }

  getService(event) {
    let data = '';
    if (event.target.value) {
      data = data + '?service_name=' + event.target.value;
    }
    this.filterOrderService.getService(data).subscribe((data) => {
      this.serviceName = data['data'];
    });
  }

  displayService(id) {
    if (this.serviceName) {
      return this.serviceName.find(service => service.service_id === id).service_name;
    }
  }

  reset() {
    const arrayItem = Object.getOwnPropertyNames(this.searchForm.controls);
    for (let i = 0; i < arrayItem.length; i++) {
      this.searchForm.controls[arrayItem[i]].setValue('');
    }
    // this.sortData = '';
  }

  getStatus() {
    this.filterOrderService.getStatus().subscribe((data) => {
      this.status = data['data'];
    });
  }

  search() {
    if (this.searchForm.valid) {
      this.dialogRef.close(this.searchForm)
    }
  }

}
