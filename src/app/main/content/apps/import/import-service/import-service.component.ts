import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { ImportServiceService } from './import-service.service';
import { Functions } from '@fuse/core/function';
import { MatDialog } from '@angular/material';
import { FileManagerService } from '../../file-manager/file-manager.service';
import { fuseAnimations } from '@fuse/animations';
import { APIConfig } from 'app/main/content/pages/authentication/config';
import * as FileSaver from 'file-saver';
import { UserService } from '@fuse/directives/users/users.service';
@Component({
  selector: 'import-service',
  templateUrl: './import-service.component.html',
  styleUrls: ['./import-service.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  providers: [UserService, ImportServiceService, ToastyService, FileManagerService],

})
export class ImportServiceComponent implements OnInit {
  selected: any;
  pathArr: string[];
  hasImportService;
  itemFile:any;

  constructor(
    public dialog: MatDialog,
    private importServiceService: ImportServiceService,
    private _Func: Functions,
    private router: Router,
    private _user: UserService,
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
        this.hasImportService = this._user.RequestPermission(data, 'importService');
        /* Check orther permission if View allow */
        if (!this.hasImportService) {
          this.router.navigateByUrl('pages/landing');
        }
      },
      err => {
        this.toastyService.error(err.error.errors.message);
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
    // that.importServiceService.importFile(that.itemFile.name).subscribe(
    //   (response) => {
    //     console.log(response);
    //   },
    //   err => {
    //     console.log(err)
    //   }
    // );
		formData.append("file", that.itemFile, that.itemFile.name);

		xhr.open("POST", `${that.apiConfig.IMPORT_SERVICE}`, true);
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
					FileSaver.saveAs(blob, 'Service_Error.xlsx');
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

						// that.messages = that.funcs.Messages('success', msg);
						// that.cusFile.nativeElement.value = '';
					} else {
            that.toastyService.error(msg)

						// that.messages = that.funcs.Messages('danger', msg);
					}
					// that.showLoadingOverlay = false;
				}
			}
		};
		xhr.send(formData);
	}

}
