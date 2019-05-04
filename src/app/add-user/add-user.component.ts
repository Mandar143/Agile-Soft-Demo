import { Component, OnInit, ViewChild, Input, Output, EventEmitter, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from './user.model';
import { UserService } from '../user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  fromBtnText = 'Save';
  user: UserModel;
  userModel: UserModel;
  formControlArray: string[];

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.data){
      this.user= this.data;
      this.userModel = this.user;
      this.userForm = this.createForm();
    }
    else{
      this.user = new UserModel();
      this.user.clear();
  
      this.userModel = this.user;
      this.userForm = this.createForm();
    }
    
  }

  closePanel() {
    this.dialogRef.close();
  }

  ngOnChanges() {
  }

  createForm() {
    return this._formBuilder.group({
      first_name: [this.userModel.first_name, Validators.compose([Validators.pattern(/^[a-zA-Z]+$/)])],
      last_name: [this.userModel.last_name, Validators.compose([Validators.pattern(/^[a-zA-Z]+$/)])],
      contact: [
        this.userModel.contact,
        [
          Validators.compose([
            Validators.required,
            Validators.pattern(/^[0-9](?!00000000)\d{7,14}$/),
            Validators.minLength(8),
            Validators.maxLength(15)
          ])
        ]
      ],
      email: [this.userModel.email, [Validators.compose([
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])]],
      gender: [this.userModel.gender, [Validators.required]],
    });
  }
  submitForm() {
    const params = this.userForm.getRawValue();
    const checkUser=JSON.parse(localStorage.getItem('Users'));

    if(!checkUser){
      params.id=1;
      localStorage.setItem('Users',JSON.stringify(params));
      Swal.fire('Save User','User Save Successfully','success');
      this.dialogRef.close();
    }
    else if(checkUser.id){
      localStorage.removeItem('Users');
      localStorage.setItem('Users',JSON.stringify(params));
      Swal.fire('Save User','User Save Successfully','success');
      this.dialogRef.close();
    }
    else if(checkUser['email']!=params['email']){
      params.id=checkUser['id'] + 1;
      localStorage.setItem('Users',JSON.stringify(params));
      Swal.fire('Save User','User Save Successfully','success');
      this.dialogRef.close();
    }
    console.log(params)
  }

  removeExtraSpaces(value) {
    if (this.userForm.get(value)) {
      if (!(this.userForm.get(value).value == null)) {
        const commentControl = this.userForm.get(value);
        const value1 = commentControl.value;
        commentControl.setValue(value1.toString().replace(/\s\s+/g, ' ').trim());
      }
    }
  }
}
