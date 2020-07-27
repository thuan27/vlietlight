import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from '@fuse/directives/ng2-toasty';
import { RolesService } from './roles.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Functions } from '@fuse/core/function';
import { MatDialog } from '@angular/material';
import { FuseSubmitRolesComponent } from '@fuse/components/submit-roles/submit-roles.component';

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  providers: [RolesService, ToastyService],

})
export class RolesComponent implements OnInit {
  roleList: Array<any> = [];
  curRoleName: string = '';
  isCheckedAll = false;
  allGroupPermission = [];
  permissionFilterKey = '';
  activeRole = {};
  dialogRef: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private rolesService: RolesService,
    private _Func: Functions,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
  }

  ngOnInit() {
    this.getRoles();
    this.getAllPermission();
    this.getAllPermission();
  }

  private getRoles() {
    this.rolesService.getRoles().subscribe((response) => {
      this.roleList = response['data'];
      this.setActiveRole(this.activeRole['name']);
    })
  }

  updateActiveRole(role:any) {
    this.activeRole['is_active'] = false;
    role['is_active'] = true;
    this.activeRole = role;
  }

  getPermissionsByRoleName(roleName: string = '') {
    // prevent call api again
    if (roleName === this.curRoleName) {
      return;
    }
    this.curRoleName = roleName;

    this.rolesService.getPermissionsByRoleName(roleName).subscribe(
      data => {
        this.upgradeGroupsPermission();
        this.processAllGroupPermission(data['group_permissions']);
        this.setIsCheckedAll();
      },
      err => {
        this.toastyService.error(this._Func.parseErrorMessageFromServer(err));
      }
    );
  }

  checkAll() {
    this.isCheckedAll = !this.isCheckedAll;

    if (this.isCheckedAll) {
      this.allGroupPermission = this.allGroupPermission.map(groupPermission => {
        for (const permissionObj of groupPermission['extended_permissions']) {
          permissionObj['checked'] = true;
        }
        groupPermission['checked'] = true;

        return groupPermission;
      });
    } else {
      this.allGroupPermission = this.allGroupPermission.map(groupPermission => {
        for (const permissionObj of groupPermission['extended_permissions']) {
          permissionObj['checked'] = false;
        }
        groupPermission['checked'] = false;

        return groupPermission;
      });
    }
  }

  private getAllPermission() {
    this.rolesService.getPermission()
      .subscribe(
        data => {
          if (data['data'].group_permissions) {
            this.allGroupPermission = data['data'].group_permissions;
            this.upgradeGroupsPermission();
            this.setIsCheckedAll();
          }
        },
        err => {
          this.toastyService.error(this._Func.parseErrorMessageFromServer(err));
        }
      )
  }
  checkGroupPermission(groupPermission: any = {}) {
    groupPermission['checked'] = !groupPermission['checked'];
    if (groupPermission['checked']) {
      for (const exPermission of groupPermission['extended_permissions']) {
        exPermission['checked'] = true;
      }
    } else {
      for (const exPermission of groupPermission['extended_permissions']) {
        exPermission['checked'] = false;
      }
    }
    this.setIsCheckedAll();
  }

  checkPermission(permission: any = {}, groupPermission: any = {}) {
    permission['checked'] = !permission['checked'];

    if (!permission['checked']) {
      groupPermission['checked'] = false;
    } else {
      for (const per of groupPermission['extended_permissions']) {
        if (!per['checked']) {
          groupPermission['checked'] = false;
          return;
        }
      }
      groupPermission['checked'] = true;
    }

    this.setIsCheckedAll();
  }

  private setIsCheckedAll() {
    for (const groupPermission of this.allGroupPermission) {
      if (!groupPermission['checked']) {
        this.isCheckedAll = false;
        return;
      }
    }
    this.isCheckedAll = true;
  }

  private processAllGroupPermission(groupsPermission: any[] = []) {
    this.allGroupPermission = this.allGroupPermission.map(groupPermission => {
      for (const groupPerTemp of groupsPermission) {
        if (groupPermission['group'] === groupPerTemp['group']) {
          let countPermission = 0;
          for (const exPermission of groupPermission['extended_permissions']) {
            if (groupPerTemp['permissions'].includes(exPermission['name'])) {
              exPermission['checked'] = true;
              countPermission += 1;
            }
          }
          if (countPermission === groupPermission['extended_permissions'].length) {
            groupPermission['checked'] = true;
          }
          continue;
        }
      }
      return groupPermission;
    });
  }

  private upgradeGroupsPermission() {
    this.allGroupPermission = this.allGroupPermission.map(groupPermission => {
      groupPermission['extended_permissions'] = [];
      for (const permission of groupPermission['permissions']) {
        groupPermission['extended_permissions'].push({ name: permission['name'], description: permission['description'], checked: false });
      }
      groupPermission['checked'] = false;

      return groupPermission;
    });
  }

  private setActiveRole(roleName:string = '') {
    for (let role of this.roleList) {
        if (role['name'] === roleName) {
            this.activeRole['is_active'] = false;
            role['is_active'] = true;
            this.activeRole = role;
            return;
        }
    }
  }

  update() {
    // Prepare updated data for role
    let updatedRole = {code: this.activeRole['code'], name: this.activeRole['name'], update_name: this.activeRole['name'], description: this.activeRole['description']};
    let permissions = [];

    for (const groupPermission of this.allGroupPermission) {
        for (const exPermissions of groupPermission['extended_permissions']) {
            if (exPermissions['checked']) {
                permissions.push(exPermissions['name']);
            }
        }
    }
    updatedRole['permissions'] = permissions;

    this.rolesService.updateRole(updatedRole['name'], JSON.stringify(updatedRole)).subscribe(
        data => {
            this.toastyService.success('Updated successfully.');
        },
        err => {
            this.toastyService.error(this._Func.parseErrorMessageFromServer(err));
        }
    );
}

addRole() {
  this.dialogRef = this.dialog.open(FuseSubmitRolesComponent, {
    data      : {
      allGroupPermission: this.allGroupPermission
    }
});
this.dialogRef.afterClosed()
.subscribe(response => {
  if (!response) { return }
  this.rolesService.addRole(JSON.stringify(response[1])).subscribe(
    data => {
        this.toastyService.success('Created successfully.');
        this.activeRole = response[1];
        this.getRoles();
        this.getPermissionsByRoleName(this.activeRole['name']);
    },
    err => {
      this.toastyService.error(this._Func.parseErrorMessageFromServer(err));
    }
);
});
}

}
