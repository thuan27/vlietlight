import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { Functions } from '@fuse/core/function';
import { MatDialog } from '@angular/material';
import { FileManagerService } from '../../file-manager/file-manager.service';
import { fuseAnimations } from '@fuse/animations';
import { APIConfig } from 'app/main/content/pages/authentication/config';
import * as FileSaver from 'file-saver';
import { UserService } from '@fuse/directives/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'import-country',
  templateUrl: './import-country.component.html',
  styleUrls: ['./import-country.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  providers: [UserService, ToastyService, FileManagerService],

})
export class ImportCountryComponent implements OnInit {
  selected: any;
  pathArr: string[];
  hasImportCountry;
  private itemFile:any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _user: UserService,
    private _Func: Functions,
    private apiConfig: APIConfig,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
  }

  ngOnInit() {
    this.checkPermission();
  }

  private checkPermission() {
    this._user.GetPermissionUser().subscribe(
      data => {
        this.hasImportCountry = this._user.RequestPermission(data, 'importCountry');
        /* Check orther permission if View allow */
        if (!this.hasImportCountry) {
          this.router.navigateByUrl('pages/landing');
        }
      },
      err => {
        this.toastyService.error(this._Func.parseErrorMessageFromServer(err));
      }
    );
  }

  changeItemFile(event) {
    this.itemFile = <Array<File>> event.target.files[0];
  }

  importFile() {
		const that = this;
		if(!this.itemFile) {
			return;
		}
		let formData:any = new FormData();
		let xhr = new XMLHttpRequest();

		// process file
		const fileExtension = that.itemFile.name.substr(that.itemFile.name.length - 4);
		if (fileExtension !== "xlsx" && fileExtension !== ".csv") {
      that.toastyService.error('Only upload file extend .xlsx !!!')
			return;
    }
		formData.append("file", that.itemFile, that.itemFile.name);

		xhr.open("POST", `${that.apiConfig.IMPORT_COUNTRY}`, true);
		xhr.setRequestHeader("Authorization", 'Bearer ' + that._Func.getToken());
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 2) {
				if (xhr.status == 200) {
					xhr.responseType = "blob";
				} else {
					xhr.responseType = "text";
				}
			}

			if (xhr.readyState == 4) {
				if (xhr.status === 200) {
          that.toastyService.error('Import file has some errors.')
					var blob = new Blob([this.response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
					FileSaver.saveAs(blob, 'Country_Error.xlsx');
				} else {
					let msg = '';

					if(xhr.response) {
						try {
							var res = JSON.parse(xhr.response);
              msg = res.errors && res.errors.message ? res.errors.message : res.data.message;
						}
						catch(err){
							msg = xhr.statusText
						}
					}
					else {
						msg = xhr.statusText;
					}

					if(!msg) {
						msg = "Sorry, there's a problem with the connection.";
					}

					if (xhr.status === 201) {
            that.toastyService.success('Successfully!')

					} else {
            that.toastyService.error(msg)

					}
				}
			}
		};
		xhr.send(formData);
	}

}
