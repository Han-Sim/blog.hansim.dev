---
title: "Full-stack web development with Express and Handlebars"
date: "2019-06-28 05:47:00"
author: "Han Sim"
category: "Web Development"
tags:
  - Portfolio
  - JavaScript
  - Web
  - Node.js
  - Fullstack
  - Template-Engine
  - Handlebars.js
  - Express
  - Bootstrap
  - REST-API
  - Web-Service
---

This is a final project from the WEB322 course @ Seneca College.

# Full-stack Web Development with `Node.js` and `Express`

**Demo**: https://web322-final-project.herokuapp.com/

**Source code**: https://github.com/Han-Sim/web-fullstack-express-hbs

## This project inlcudes...

- RESTful API with Node.js/Express
- Postgres w/ Sequelize
- Template Engine: Handlebars.js
- Bootstrap

## RESTful API

You can manage two databases of employees and departments

### Data Structure: data-service.js

I used `sequelize` to access to `Postgres`

```JavaScript
const Employee = sequelize.define('Employee', {
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
});

const Department = sequelize.define('Department', {
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentName: Sequelize.STRING
});
```

### `GET` information of employees

#### Server-side: data-service.js

```JavaScript
module.exports.getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync()
        .then(() => { resolve(Employee.findAll()); })
        .catch((err) => { reject("No result returned. " + err); });
    });
}
```

### `POST` new employee

#### Client-side

**Screenshot**

![Screen Shot 2019-05-24 at 7.11.11 PM.png](https://i.loli.net/2019/05/25/5ce87a9a8a13428638.png)

#### Server-side

##### server.js

```JavaScript
app.post('/employees/add', (req,res) => {
    dataService.addEmployee(req.body).then((data) => {
        res.redirect("/employees");
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Unable to add employee");
    });
});
```

##### data-service.js

```JavaScript
module.exports.addEmployee = (employeeData) => {
    employeeData.isManager = (employeeData.isManager) ? true : false;
    console.log("change employeeData.isManager to " + employeeData.isManager);
    for (const prop in employeeData) {
        if(employeeData[prop] == "") {
            employeeData[prop] = null;
            console.log(`employeeData.${prop} is set to ${employeeData[prop]}.`);
        }
    }

    return new Promise((resolve, reject) => {
        sequelize.sync()
        .then(() => {
            console.log(employeeData);
            Employee.create({
                firstName: employeeData.firstName,
                lastName: employeeData.lastName,
                email: employeeData.email,
                SSN: employeeData.SSN,
                addressStreet: employeeData.addressStreet,
                addressCity: employeeData.addressCity,
                addressState: employeeData.addressState,
                addressPostal: employeeData.addressPostal,
                maritalStatus: employeeData.maritalStatus,
                isManager: employeeData.isManager,
                employeeManagerNum: employeeData.employeeManagerNum,
                status: employeeData.status,
                department: employeeData.department,
                hireDate: employeeData.hireDate
            }).then(() => { resolve(); })
            .catch((err) => { reject("Unable to create employee... "  + err) });
        }).catch((err) => { reject("Unable to create employee. " + err); });
    });
}
```

### Update employee info

#### Client-side

You can click an employee to get into this update page.

```HTML
<form method="post" action="/employee/update">
```

This page `GET`s the information of the employee and also `POST`s if any new information has been submitted

**Screenshot**

![Screen Shot 2019-05-24 at 7.11.52 PM.png](https://i.loli.net/2019/05/25/5ce87aa4ce80e22027.png)

#### Server-side

```JavaScript
app.post('/employee/update', (req,res) => {
    dataService.updateEmployee(req.body).then(() => {
        res.redirect("/employees");
    }).catch((err) => {
        res.status(500).send("Unable to update employee");
    })
});

app.get("/employee/:empNum", (req, res) => {
    // initialize an empty object to store the values
    let viewData = {};

    dataService.getEmployeeByNum(req.params.empNum).then((data) => {
        if (data) {
            viewData.employee = data; //store employee data in the "viewData" object as "employee"
            console.log("set viewData.employee!!!");
        } else {
            viewData.employee = null; // set employee to null if none were returned
        }
    }).catch(() => {
        viewData.employee = null; // set employee to null if there was an error
    }).then(dataService.getDepartments)
    .then((data) => {
        viewData.departments = data; // store department data in the "viewData" object as "departments"

        // loop through viewData.departments and once we have found the departmentId that matches
        // the employee's "department" value, add a "selected" property to the matching
        // viewData.departments object
        for (let i = 0; i < viewData.departments.length; i++) {
            if (viewData.departments[i].departmentId == viewData.employee[0].department) {
                viewData.departments[i].selected = true;
            }
        }
    }).catch(() => {
        viewData.departments = []; // set departments to empty if there was an error
    }).then(() => {
        if (viewData.employee == null) { // if no employee - return an error
            res.status(404).send("Employee Not Found");
        } else {
            res.render("employee", { viewData: viewData }); // render the "employee" view
        }
    }).catch((err)=>{
        console.log(err);
    });
});
```
