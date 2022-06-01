const inquirer = require("inquirer");
const mysql = require ("mysql2");
const consoleTable = require("console.table");

const connection = require("./conection/conection");
const queries = require ("./db/queries");

// console.log(departmentArray)
let departmentArray = [];
let roleArray = [];
let employeeArray = [];
let managerArray = [];

const employeeTracker = () => {
    return inquirer.prompt ([
        {
            type: "list",
            name: "accion",
            message: "Please Select an Option",
            choices:["All Departments", "All Roles", "All Employees", "Add Department", "Add Role", "Add Employee", "Update An Employee Role"]
        },
        //Add Department name (id should be automatic)
        {
            type: "input",
            name:"department",
            message: "Please enter the name for the new Department.",
            when: (input) => input.accion === "Add Department",
            validate: department => {
                if(department) {
                    return true;
                } else {
                    return false;
                }

            }
        },
        //Add role (should ask for name, Salary, which department does the role belong to)
        {
            type: "input",
            name: "roleName",
            message: "What is the name of the role?",
            when: (input) => input.accion === "Add Role",
            validate: roleName => {
                if(roleName) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary for this role?",
            when: (input) => input.accion === "Add Role"
        },
        {
            type: "choices",
            name: "roleDeparment",
            choices: departmentArray,
            message:"What department does the role belong to?",
            when: (input) => input.accion === "Add Role"
        },
        //Add Employee (should ask for first name, last name, employee role, employee manager)
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of the employee?",
            when: (input) => input.accion === "Add Employee"

        },
        {
            type: "input",
            name: "lastName",
            message: "What is the last name of the employee?",
            when: (input) => input.accion === "Add Employee"
            
        },
        {
            type: "choices", 
            name: "employeeRole",
            message: "What is the role for the employee?",
            choices: roleArray,
            when: (input) => input.accion === "Add Employee"
        },
        {
            type: "choices", 
            name: "employeeManager",
            message: "Who is the employees manager?",
            choices: managerArray,
            when: (input) => input.accion === "Add Employee"
        },
        //Update an Employee role
        {
            type: "choices",
            name: "employeeUpdate",
            message: "Which employee's role would you like to update?",
            choices: employeeArray,
            when: (input) => input.accion === "Update An Employee Role"
        },
        {
            type: "choices", 
            name: "newemployeeRole",
            message: "Which role do you want to assign the selected employee?",
            choices: roleArray,
            when: (input) => input.accion === "Update An Employee Role"
        },


        //Allows the user to select more options once they are done.
        {
            type: "confirm",
            name: "restart",
            message: "Do you wish to continue?"
            
        }
        
        
        

        
    ])

    .then (answers => {
        let {accion, department, roleName, salary, roleDepartment, firstName, lastName, employeeRole, employeeManager, employeeUpdate, newemployeeRole, restart} = answers;
        let teamMember

        if(accion === "All Departments") {
            
        }

        if(accion === "Add Department") {
            connection.query("INSERT INTO department SET ?", {
                name:answers.department
            })
        }

        if(accion === "Add Role") {
            connection.query("INSERT INTO role SET ?", {
                title: answers.roleName,
                salary: answers.salary,
                department_id: answers.department
            })
        }

        if (accion === "Add Employee") {
            connection.query("INSERT INTO employee SET ?", {
                first_name: answers.firstName,
                last_name: answers.lastName,
                // role_id
            })
        }

        console.log(answers);
        
        if (restart) {
            return employeeTracker();
        }else {
            
        }
        
    });

};


employeeTracker()

