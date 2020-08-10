/* @tien.nguyen@seldatinc.com */
import {Component,Input, Output,EventEmitter} from '@angular/core';
// import {WMSPagination, PaginationService} from '../../../common/directives/directives';
// import { API_Config,Functions} from '../../../common/core/load';
import {masterPalletServices} from "./master-pallet-service";
// import {TranslatePipe} from '../../../common/translate';


@Component ({
  selector: 'master-pallet-list-directive',
  // directives:[WMSPagination],
  providers: [masterPalletServices],
  templateUrl: 'master-pallet.html',
  // pipes:[TranslatePipe]
})

export class MasterPalletListDirective {

  private _bolID = '';
  private masterPalletList = [];

  @Input('bolID') set bolID(value: string) {
    this._bolID=value;
    if (value) {
      this.getMasterPalletList(1);
    }
  }

  @Output() messages=  new EventEmitter();
  @Output() showLoadingOverlay=  new EventEmitter();

  constructor(
              // private _Func: Functions,
              // private _API: API_Config,
              private _masterPalletServices:masterPalletServices) {}

  private getMasterPalletList(page: any = ''){

    // this.showLoadingOverlay.emit(true);
    // var params = "?page=" + page + "&limit=" + this.perPage;
    // this._masterPalletServices.getMasterPalletList(this._Func.lstGetItem('whs_id'), this._bolID, params).subscribe(
    //     data => {

    //       this.masterPalletList = data['data'];
    //       this.initPagination(data);
    //       this.showLoadingOverlay.emit(false);
    //     },
    //     err => {

    //       this.showLoadingOverlay.emit(false);
    //     },
    //     () => {}
    // );

  }

// Set params for pagination
  // private Pagination;
  // private currentPage = 1;
  // private perPage = 20;
  // private initPagination(data) {

  //   var meta = data.meta;
  //   this.Pagination = meta['pagination'];
  //   this.Pagination['numLinks'] = 3;
  //   this.Pagination['tmpPageCount'] = this._Func.Pagination(this.Pagination);

  // }

  // private onPageSizeChanged($event, el = '')
  // {

  //   this.perPage = parseInt($event.target.value);

  //   if ((this.Pagination['current_page'] - 1) * this.perPage >= this.Pagination['total']) {
  //     this.currentPage = 1;
  //   }
  //   else {
  //     this.currentPage = this.Pagination['current_page'];
  //   }
  //   if (el == 'master-pallet') {

  //     this.getMasterPalletList(this.currentPage);
  //   }
  // }

  // private parseError(err){
  //   this.messages.emit({'status' : 'danger', 'txt' : this._Func.parseErrorMessageFromServer(err)});
  // }


}
