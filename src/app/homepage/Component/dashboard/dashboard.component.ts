import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonService } from '../common.service';
import { EmpModel } from './emp.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  formValue !: FormGroup;
  empObj: EmpModel = new EmpModel();
  empData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  btnValue = 'Submit';
  submitted = false;
  columns = [
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Address' },
    { name: 'Birth Date' },
    { name: 'Mobile' },
    { name: 'City' },
  ];
  constructor(private fb: FormBuilder, private api: CommonService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.formValue = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      addr: ['', Validators.required],
      dob: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[6-9]{1}[0-9]{9}')]],
      city: ['', Validators.required],
    });
    this.getEmployeeList()
  }

  getEmployeeList() {
    this.api.getEmployee().subscribe(res => {
      this.empData = res;
    })
  }

  clickAddEmp() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onSubmit() {
    this.submitted = true;
    if (this.btnValue != 'Submit') {
      this.updateEmp()
    }
    else if (this.btnValue = 'Update') {
      this.addEmp()
    }
  }

  addEmp() {
    this.btnValue = 'Submit';
    this.empObj.firstName = this.formValue.value.firstName;
    this.empObj.lastName = this.formValue.value.lastName;
    this.empObj.addr = this.formValue.value.addr;
    this.empObj.dob = this.formValue.value.dob;
    this.empObj.mobile = this.formValue.value.mobile;
    this.empObj.city = this.formValue.value.city;

    this.api.addEmployee(this.empObj).subscribe(res => {
      Swal.fire({
        title: 'Your Record has been added successfully',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getEmployeeList();
    })
  }

  editEmp(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.empObj.id = row.id;
    this.btnValue = 'Update';

    this.formValue.controls['firstName'].setValue(row.firstName)
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['addr'].setValue(row.addr)
    this.formValue.controls['dob'].setValue(row.dob)
    this.formValue.controls['mobile'].setValue(row.mobile)
    this.formValue.controls['city'].setValue(row.city)
  }

  updateEmp() {
    this.submitted = true;
    this.empObj.firstName = this.formValue.value.firstName;
    this.empObj.lastName = this.formValue.value.lastName;
    this.empObj.addr = this.formValue.value.addr;
    this.empObj.dob = this.formValue.value.dob;
    this.empObj.mobile = this.formValue.value.mobile;
    this.empObj.city = this.formValue.value.city;
    this.btnValue = 'Update';

    this.api.updateEmployee(this.empObj, this.empObj.id).subscribe(res => {
      Swal.fire({
        title: 'Your record has been updated successfully!',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getEmployeeList();
    })
  }

  deleteEmp(row: any) {
    this.api.deleteEmployee(row.id).subscribe(res => {
      Swal.fire({
        title: 'Your record has been deleted successfully!',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
      this.getEmployeeList();
    })
  }
}
