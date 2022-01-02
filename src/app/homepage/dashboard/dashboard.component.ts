import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmpModel } from './emp.model';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AuthService } from 'src/app/services/auth.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';


import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  faUser = faUser;
  formValue !: FormGroup;
  empObj: EmpModel = new EmpModel();
  empData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  btnValue = 'Submit';
  submitted = false;


  managerData!:any;
  managerDataLength!:any;
  empDataLength!:any;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: any[] = ['Users'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = []; 
  barChartData!: any[] 

  
  columns = [
    { name: 'ID' },
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Address' },
    { name: 'Birth Date' },
    { name: 'Mobile' },
    { name: 'City' },
  ];

  constructor(private fb: FormBuilder, private api: CommonService, public datepipe: DatePipe,
    private auth: AuthService, private router: Router, private managerApi: ApiService) { }

  date: any;
  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      this.router.navigate(['/signup']);
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
    this.managerApi.getManager().subscribe(res => { 
      this.managerDataLength = res.length  ;       
    })
    this.api.getEmployee().subscribe(res => {  
      this.empData = res;  
      this.empDataLength = res.length  ;  
      for (var i = 0; i < res.length; i++) {
        this.empData[i].dob = this.datepipe.transform(res[i].dob, 'dd-MM-yyyy');          
      }      
      this.barChartData = [
        { data: [this.managerDataLength], label: 'Manger' },        
        { data: [this.empDataLength], label: 'Employee' }
      ];
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

