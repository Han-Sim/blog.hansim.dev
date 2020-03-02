---
title: "Angular: web application working with REST API"
date: "2019-06-28 04:18:00"
author: "Han Sim"
menu: "Web Development"
category: "Angular | TypeScript"
tags:
  - Portfolio
  - JavaScript
  - Web
  - Frontend
  - TypeScript
  - Angular
  - Bootstrap
  - REST-API
  - Web-Service
---

# Modern Web Application with Angular/TypeScript

**Demo**: https://web422-angular-app.herokuapp.com/

**Source code**: https://github.com/Han-Sim/web-angular-hr-management

This webapp is to manage employees using Rest API([click](https://web422-teams-api-han.herokuapp.com/employees))

`get`, `post`, `delete`, and `put`

## Core Dependencies

- @angular/forms
- @angular/router
- Angular services: located in `src/app/data`
  - @angular/common/http : HttpClient
  - @angular/core : Injectable
  - rxjs : Observable

## Key source codes

### employee.service.ts

These functions return `Observable`s; it is to be `subscribe`d after.

```JavaScript
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Employee } from "./employee";
import { EmployeeRaw } from "./employeeRaw";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  private url = "https://web422-teams-api-han.herokuapp.com";

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.url}/employees`);
  }

  saveEmployee(employee: EmployeeRaw) {
    return this.http.put<any>(this.url + "/employee/" + employee._id, employee);
  }

  getEmployee(id): Observable<EmployeeRaw[]> {
    return this.http.get<EmployeeRaw[]>(this.url + "/employee-raw/" + id);
  }

```

### employee.component.ts

```JavaScript
//...
  ngOnInit() {
    this.paramSubScription = this.activatedRoute.params.subscribe(params => {
      this.employeeSubscription = this.employeeService
        .getEmployee(params["_id"])
        .subscribe(emp => {
          this.employee = emp[0];
          this.getPositionsSub = this.positionService
            .getPositions()
            .subscribe(data => {
              this.positions = data;
            });
        });
    });
  }

  onSubmit() {
    this.saveEmployeeSubscription = this.employeeService
      .saveEmployee(this.employee)
      .subscribe(
        () => {
          this.successMessage = true;
          setTimeout(() => {
            this.successMessage = false;
          }, 2500);
        },
        () => {
          this.failMessage = true;
          setTimeout(() => {
            this.failMessage = false;
          }, 2500);
        }
      );
  }
//...
```

### View

**Demo**: https://web422-angular-app.herokuapp.com/employee/5997456604a898b529b5ed6a

**Source Code**: https://github.com/Han-Sim/web-angular-hr-management/blob/master/src/app/employee/employee.component.html

**Screenshot**

![Screen Shot 2019-06-28 at 4.27.42 AM.png](https://i.loli.net/2019/06/28/5d15cfaf8d33014582.png)