# EmployeeTracker-SQL

# Gihub Repository
https://github.com/Pablogarciag02/EmployeeTracker-SQL

## Youtube Video Showing Functionality
[Example-Walkthrough](https://www.youtube.com/watch?v=IogJrzY-Qm0&ab_channel=PabloGarcia)

## About this Project
-Every company must use a database or a table to manage and know information about their employees
Allthough excel is a usefull choice, SQL takes it up a notch

-Due to this, i developed an employee tracker that allows any company to create, add remove and assign roles to any employee thanks to their department and salary

-This makes it easy for any company to manage their workers and for them to be able to update, their current workforce, change roles for the workers, remove and delete certain employees, etc...

This project uses
[SQL2](https://www.npmjs.com/package/mysql2) Connects to sql database
[Console.Table](https://www.npmjs.com/package/console.table) Adds a console.table method for convinience.


![Example](/images/example1.jpg)
![Example2](/images/example2.jpg)
Manage a company employee database using this app

## Table of Contents
-Installation
-Credits
-Licence
-Features
-Contribution


### Use the deployed app through this link:
Deployed-App:
https://note-taker-pablogarciag02.herokuapp.com/


### Installation
*Step 1*: Install inquirer by writing the following in the command terminal `npm i ` This will install inquirer, and console.table .

*Step 2*: execute the [employeetracker](/db/employeetracker_db.sql) so that you create a database in SQL

*Step 3*: in the integrated terminal within index.js, run the following command `node index.js`This will connect the javascript file with the database.
Thanks to the prompt, add, delete and manage departments, roles and employees as you must.

*Step 4*: Enjoy the app and a easy to manage database with employee data. (^-^)


### Credits
Pablo Eugenio Garcia
Github: [Pablogarciag02](https://github.com/Pablogarciag02)
LinkedIn: [Pablo-Eugenio-Gacía](https://www.linkedin.com/in/pablo-garc%C3%ADa-08842621b/)

## Licence
MIT License

Copyright (c) 2022 Pablo Eugenio Garcia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Features
Allows the user to create, update and delete departments, roles and employees from a database. 

## Contribution
Feel free to fork and use this project for your personal use if you are a business owner, or a busy student. Or if you want to make it better you can ask for a pull request 