import { Employee } from './../../model/employee';
import { EmployeeService } from './../../service/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  empDetail!: FormGroup;

  employeeData!: any;
  empObj: Employee = new Employee();
  empList: Employee[] = [];
  constructor(private FormBuilder: FormBuilder, private _service:EmployeeService) {}

  ngOnInit(): void {
    this.empDetail = this.FormBuilder.group({
      id: [''],
      fullName: [''],
      department: [''],
      employeeNumber: [''],
      email: [''],
      phoneNumber: [''],
    });
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.empDetail.reset()
  }
  addEmployee() {
    this.empObj.id = this.empDetail.value.id;
    this.empObj.fullName = this.empDetail.value.fullName;
    this.empObj.department = this.empDetail.value.department;
    this.empObj.employeeNumber = this.empDetail.value.employeeNumber;
    this.empObj.email = this.empDetail.value.email;
    this.empObj.phoneNumber = this.empDetail.value.phoneNumber;
  
    this._service.postEmployee(this.empObj) 
    .subscribe((res : any)=>{
      console.log(res);
      alert("Employee added successfully")
     
      let ref = document.getElementById('cancel')
      ref?.click(); //close the modal automatically

      this.empDetail.reset(); //reset the form to be empty
      this.getAllEmployee(); // once a partcular employee is added(posted) the data should be displayed

    },
    (err : any)=>{
      alert("something went wrong"); 
    }
    )
  }

    getAllEmployee(){
      this._service.getEmployee()
      .subscribe((res : any)=>{
      this.employeeData = res;
      })
    }
  
 deleteEmployee(row: any){
   this._service.deleteEmployee(row.id)
   .subscribe(res=>{
     alert("Employee Deleted")
     this.getAllEmployee();
   })
 }

 onEdit(row: any){
   this.empObj.id = row.id;
   this.empDetail.controls["fullName"].setValue(row.fullName)
   this.empDetail.controls["department"].setValue(row.department)
   this.empDetail.controls["employeeNumber"].setValue(row.employeeNumber)
   this.empDetail.controls["email"].setValue(row.email)
   this.empDetail.controls["phoneNumber"].setValue(row.phoneNumber)

 }
 updateEmployee(){
  this.empObj.fullName = this.empDetail.value.fullName;
  this.empObj.department = this.empDetail.value.department;
  this.empObj.employeeNumber = this.empDetail.value.employeeNumber;
  this.empObj.email = this.empDetail.value.email;
  this.empObj.phoneNumber = this.empDetail.value.phoneNumber;

  this._service.updateEmployee(this.empObj, this.empObj.id)
  .subscribe(res=>{
    alert("Updated Successfuly") // subscribe to updateEmployee method and on success response alert 
    let ref = document.getElementById('cancel')
    ref?.click(); //close the modal automatically same as what we did for post

    this.empDetail.reset(); //reset the form to be empty
    this.getAllEmployee();
  })
 }

}


 
