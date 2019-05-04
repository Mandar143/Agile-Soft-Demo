import { Component, OnInit, ViewChild, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import Swal from 'sweetalert2';
import { UserModel } from '../add-user/user.model';
import { UserService } from '../user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material';

const ELEMENT_DATA = [
  { id: 1, first_name: 'Mandar', email: 'mmkirad@gmail.com', last_name: 'Kirad', contact: 'asdsad', gender: 1 },

];
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  searchForm: FormGroup;
  dataSource: any = [];
  displayedColumns: string[] = [
    //'id',
    'first_name',
    'last_name',
    'email',
    'contact',
    'gender',
    'actions'
  ];
  userModel: UserModel;
  oldUserModel: UserModel;
  results = [];
  userResult: any;
  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('Users'))) {
      this.dataSource = this.results.push(JSON.parse(localStorage.getItem('Users')));
      console.log(this.results);

    }
    //this.dataSource = ELEMENT_DATA;

  }

  editUser(data: UserModel) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      autoFocus: true,
      disableClose: true,
      data: data
    });
    dialogRef.afterClosed().subscribe(res => {
      this.ngOnChanges();
    })

  }

  deleteUser(deleteUserData: UserModel) {

    let message = `Do you want to remove "${deleteUserData.first_name} ${deleteUserData.last_name}"?`;
    // let showCancelButton = true;

    Swal.fire({ title: message, showCancelButton: true, showCloseButton: true }).then(result => {
      if (result.value) {
        Swal.fire('Success', "User deleted successfully", 'success');
        localStorage.removeItem('Users');

        this.ngOnChanges();

      } else {

      }
    })
  }

  ngOnChanges() {
    if (JSON.parse(localStorage.getItem('Users'))) {
      this.dataSource = this.results.push(JSON.parse(localStorage.getItem('Users')));
      console.log(this.results);

    }
  }

  loadUsersList() {

  }


  addUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      autoFocus: true,
      disableClose: true,
      data: ''
    });
    dialogRef.afterClosed().subscribe(res => {
      this.ngOnChanges();
    })
  }

}
