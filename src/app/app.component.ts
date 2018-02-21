import { Component,OnInit } from '@angular/core';
import {EmployeeService} from './services/employee.service';
import {Employee} from './model/employee.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit {
  title = 'edureka! MEAN Application - Employee Directory App';
  employeelist:any[];
  errorMessage:string;
  result:string;
  empId:string;
  DisableUpdate:boolean=true;
  

 empmodel = new Employee();  

  constructor (private _employeeService:EmployeeService)
  {
    
  }
  ngOnInit():void{
    this.GetEmployeeList();
  }
  
  GetAge() {
    console.log(this.empmodel.dob);
    var dob = new Date(this.empmodel.dob);
    console.log(dob);
    console.log(this.empmodel.dob);
    var now = new Date();
    var age = now.getFullYear() - dob.getFullYear();
    this.empmodel.age = age.toString();
    };

  GetEmployeeList()
  {
    this._employeeService.getRequest('employees')
    .subscribe(employeelist=>this.employeelist=employeelist,
    error=>this.errorMessage=<any>error);
  }
    
  AddEmployeeInfo()
  {    
    this.GetAge();    
    this._employeeService.postRequest(this.empmodel,"empinsert")
      .subscribe(data =>this.result=data);
      
      let empnumber = this.employeelist.push(this.empmodel);    
  }

  ClearEmployeeList()
  {    
      this.empmodel.name = "";
      this.empmodel.email = "";
      this.empmodel.dob = "";
      this.empmodel.department = "";
      this.empmodel.gender = "";
      this.empmodel.age = "";
  }

  deleteEmployee(empId:string)
  {            
      console.log(empId);
      this._employeeService.deleteRequest('empdelete/'+empId)
      .subscribe(data =>this.result=data);
      
      for (var i=0; i <this.employeelist.length; i++)
      {                    
          if(this.employeelist[i]._id == empId)
          {   
              let removedObj = this.employeelist.splice(i,1);
          }
      }                    
  }

  EditEmployee(empId:string)
  {  
    this.empId = empId;
    this.DisableUpdate=false;
    
    for (var i=0; i <this.employeelist.length; i++)
    {                    
        if(this.employeelist[i]._id == empId)
        {                        
            this.empmodel.name = this.employeelist[i].name;
            this.empmodel.email = this.employeelist[i].email;
            this.empmodel.dob = this.employeelist[i].dob;
            this.empmodel.gender = this.employeelist[i].gender;
            this.empmodel.department = this.employeelist[i].department;
            this.empmodel.age = this.employeelist[i].age;
        }
    }
  }

  updateEmployeeInfo()
  {           
      this.GetAge();
      this.DisableUpdate=true;
      
      this._employeeService.updateRequest(this.empmodel,'empupdate/'+this.empId)
      .subscribe(data =>this.result=data);
            
      for (var i=0; i <this.employeelist.length; i++)
      {                    
          if(this.employeelist[i]._id == this.empId)
          {                        
              this.employeelist[i].name = this.empmodel.name;
              this.employeelist[i].email = this.empmodel.email;
              this.employeelist[i].dob = this.empmodel.dob;
              this.employeelist[i].gender = this.empmodel.gender;
              this.employeelist[i].department = this.empmodel.department;
              this.employeelist[i].age = this.empmodel.age;
          }
      }

      this.ClearEmployeeList();      
  }

}
