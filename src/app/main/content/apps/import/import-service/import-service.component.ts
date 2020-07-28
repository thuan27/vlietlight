import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { ImportServiceService } from './import-service.service';
import { Functions } from '@fuse/core/function';
import { MatDialog } from '@angular/material';
import { FileManagerService } from '../../file-manager/file-manager.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'import-service',
  templateUrl: './import-service.component.html',
  styleUrls: ['./import-service.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  providers: [ImportServiceService, ToastyService, FileManagerService],

})
export class ImportServiceComponent implements OnInit {
  selected: any;
  pathArr: string[];
  private itemFile:any;

  constructor(
    public dialog: MatDialog,
    private rolesService: ImportServiceService,
    private _Func: Functions,
    private toastyService: ToastyService,
    private fileManagerService: FileManagerService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
  }

  ngOnInit() {
  //   this.fileManagerService.onFileSelected.subscribe(selected => {
  //     this.selected = selected;
  //     this.pathArr = selected.location.split('>');
  //     console.log(this.selected)
  //     console.log(this.pathArr)
  // });
  }

  changeItemFile(event) {
    this.itemFile = <Array<File>> event.target.files[0];
    console.log(this.itemFile)

  }

}
