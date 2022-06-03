const inquirer = require("inquirer");
const mysql = require ("mysql2");
const consoleTable = require("console.table");

const connection = require("./connection/connection");
// const queries = require ("./db/queries");



let roleArray = [];
let employeeArray = [];
let managerArray = [];

// connectionEstablished = () => {
//    console.log("  /$$$$$$$$                         /$$                                               /$$$$$$$$                           /$$                           ")
//    console.log(" | $$_____/                        | $$                                              |__  $$__/                          | $$                           ")
//    console.log(" | $$       /$$$$$$/$$$$   /$$$$$$ | $$  /$$$$$$  /$$   /$$  /$$$$$$   /$$$$$$          | $$  /$$$$$$  /$$$$$$   /$$$$$$$| $$   /$$  /$$$$$$   /$$$$$$  ")
//    console.log(" | $$$$$   | $$_  $$_  $$ /$$__  $$| $$ /$$__  $$| $$  | $$ /$$__  $$ /$$__  $$         | $$ /$$__  $$|____  $$ /$$_____/| $$  /$$/ /$$__  $$ /$$__  $$ ")
//    console.log(" | $$__/   | $$ \ $$ \ $$| $$  \ $$| $$| $$  \ $$| $$  | $$| $$$$$$$$| $$$$$$$$         | $$| $$  \__/ /$$$$$$$| $$      | $$$$$$/ | $$$$$$$$| $$  \__/ ")
//    console.log(" | $$      | $$ | $$ | $$| $$  | $$| $$| $$  | $$| $$  | $$| $$_____/| $$_____/         | $$| $$      /$$__  $$| $$      | $$_  $$ | $$_____/| $$       ")
//    console.log(" | $$$$$$$$| $$ | $$ | $$| $$$$$$$/| $$|  $$$$$$/|  $$$$$$$|  $$$$$$$|  $$$$$$$         | $$| $$     |  $$$$$$$|  $$$$$$$| $$ \  $$|  $$$$$$$| $$       ")
//    console.log(" |________/|__/ |__/ |__/| $$____/ |__/ \______/  \____  $$ \_______/ \_______/         |__/|__/      \_______/ \_______/|__/  \__/ \_______/|__/       ")
//    console.log("                         | $$                     /$$  | $$                                                                                             ")
//    console.log("                         | $$                    |  $$$$$$/                                                                                             ")
//    console.log("                         |__/                     \______/                                                                                              ")
//    employeeTracker();
// }



const employeeTracker = () => {
    return inquirer.prompt ([
        {
            type: "list",
            name: "accion",
            message: "Please Select an Option",
            choices:["All Departments", "All Roles", "All Employees", "Add Department", "Add Role", "Add Employee", "Update An Employee Role"]
        },
    ])   
    
    .then((answers) => {
        let {accion} = answers;
//                     
        if(accion === "All Departments") {
            allDepartments()
            
        }

        if(accion === "All Roles") {
            allRoles()
        }

        if(accion === "All Employees") {
            allEmployees()
        }

        if(accion === "Add Department") {
            addDepartment()
        }

        if(accion === "Add Role") {
            addRole()
        }

        if(accion === "Add Employee") {
            addEmployee()
        }

        if(accion === "Update An Employee Role") {
            updateEmployee()
        }
    })
}

allDepartments = () => {
    connection.query(
        'SELECT id, name AS department FROM `department`', 
        function(err, results, fields) {
            console.table(results)
            employeeTracker()
        }
    )
};

allRoles = () => {
    connection.query(
        'SELECT role.id, title, salary, name AS department FROM `role` INNER JOIN department ON role.department_id = department.id', 
        function(err, results, fields) {
            console.table(results)
            employeeTracker()
        }
    )
}

allEmployees = () => {
    connection.query(
        `SELECT e.id, e.first_name, e.last_name, title, name AS department, salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        INNER JOIN role
        ON e.role_id = role.id
        INNER JOIN department
        ON role.department_id = department.id
        LEFT JOIN employee m
        ON e.manager_id = m.id;`,
        function(err, results, fields) {
            console.table(results)
            employeeTracker()
        }
    )
}

addDepartment = () => {

}
// const employeeTracker = () => {

//     connection.execute("SELECT name FROM department",  (err, results) => {
//         const departmentArray = results.map(d => {
//             return d.name
//         })    
//         console.log(departmentArray)

        
//         return inquirer.prompt([
//         {
//             type: "list",
//             name: "roleDepartment",
//             choices: departmentArray,
//             message:"What department does the role belong to?",
//             when: (input) => input.accion === "Add Role"
//         },
//     ])
//     })
        

//     connection.execute("SELECT title FROM role", (err, results) => {
//         const roleArray = results.map(r => {
//             return r.title
//         })
//         console.log(roleArray)
//     })

//     connection.execute("SELECT first_name FROM employee", (err, results) => {
//         const employeeArray = results.map(e => {
//             return e.first_name
//         })
//         console.log(employeeArray)
//     })

    

//     // connection.execute("SELECT title FROM role", (err, results) => {
//     //     const roleArray = results.map(r => {
//     //         return r.title
//     //     })
//     //     console.log(roleArray)
//     // })
    
//     connection.query(
//         'SELECT name FROM `department`' ,
//         function(err, results, fields) {
//             const departmentArray = results.map(d => {
//                 return d.name
//             })
            
//             'SELECT title FROM `role`',
//             function(err, results, fields) {
//                 const roleArray = results.map(r => {
//                     return r.title
//                 })
                

//                 return inquirer.prompt ([
//                     {
//                         type: "list",
//                         name: "accion",
//                         message: "Please Select an Option",
//                         choices:["All Departments", "All Roles", "All Employees", "Add Department", "Add Role", "Add Employee", "Update An Employee Role"]
//                     },
//                     //Add Department name (id should be automatic)
//                     {
//                         type: "input",
//                         name:"department",
//                         message: "Please enter the name for the new Department.",
//                         when: (input) => input.accion === "Add Department",
//                         validate: department => {
//                             if(department) {
//                                 return true;
//                             } else {
//                                 return false;
//                             }

//                         }
//                     },
//                     //Add role (should ask for name, Salary, which department does the role belong to)
//                     {
//                         type: "input",
//                         name: "roleName",
//                         message: "What is the name of the role?",
//                         when: (input) => input.accion === "Add Role",
//                         validate: roleName => {
//                             if(roleName) {
//                                 return true;
//                             } else {
//                                 return false;
//                             }
//                         }
//                     },
//                     {
//                         type: "input",
//                         name: "salary",
//                         message: "What is the salary for this role?",
//                         when: (input) => input.accion === "Add Role"
//                     },

                    
//                     {
//                         type: "list",
//                         name: "roleDepartment",
//                         choices: departmentArray,
//                         message:"What department does the role belong to?",
//                         when: (input) => input.accion === "Add Role"
//                     },

//                     //Add Employee (should ask for first name, last name, employee role, employee manager)
//                     {
//                         type: "input",
//                         name: "firstName",
//                         message: "What is the first name of the employee?",
//                         when: (input) => input.accion === "Add Employee"

//                     },
//                     {
//                         type: "input",
//                         name: "lastName",
//                         message: "What is the last name of the employee?",
//                         when: (input) => input.accion === "Add Employee"
                        
//                     },
//                     {
//                         type: "list", 
//                         name: "employeeRole",
//                         message: "What is the role for the employee?",
//                         choices: roleArray,
//                         when: (input) => input.accion === "Add Employee"
//                     },
//                     {
//                         type: "list", 
//                         name: "employeeManager",
//                         message: "Who is the employees manager?",
//                         choices: managerArray,
//                         when: (input) => input.accion === "Add Employee"
//                     },
//                     //Update an Employee role
//                     {
//                         type: "list",
//                         name: "employeeUpdate",
//                         message: "Which employee's role would you like to update?",
//                         choices: employeeArray,
//                         when: (input) => input.accion === "Update An Employee Role"
//                     },
//                     {
//                         type: "choices", 
//                         name: "newemployeeRole",
//                         message: "Which role do you want to assign the selected employee?",
//                         choices: roleArray,
//                         when: (input) => input.accion === "Update An Employee Role"
//                     },
                    
//                 ])


//                 .then (answers => {
//                     let {accion, department, roleName, salary, roleDepartment, firstName, lastName, employeeRole, employeeManager, employeeUpdate, newemployeeRole, restart} = answers;
//                     let teamMember

//                     //Show all the departments in the Terminal with console.table
//                     if(accion === "All Departments") {
//                         connection.query(
//                             'SELECT id, name AS department FROM `department`', 
//                             function(err, results, fields) {
//                                 console.table(results)
//                                 employeeTracker()
//                             }
//                         )
//                     }

//                     //Show all the ROLES in the Terminal with console.table
//                     if(accion === "All Roles") {
//                         connection.query(
//                             'SELECT role.id, title, salary, name AS department FROM `role` INNER JOIN department ON role.department_id = department.id', 
//                             function(err, results, fields) {
//                                 console.table(results)
//                                 employeeTracker()
//                             }
//                         )
//                     }

//                     //Show all the EMPLOYEES in the Terminal with console.table
//                     if(accion === "All Employees") {
//                         connection.query(
//                             `SELECT e.id, e.first_name, e.last_name, title, name AS department, salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
//                             FROM employee e
//                             INNER JOIN role
//                             ON e.role_id = role.id
//                             INNER JOIN department
//                             ON role.department_id = department.id
//                             LEFT JOIN employee m
//                             ON e.manager_id = m.id;`,
//                             function(err, results, fields) {
//                                 console.table(results)
//                                 employeeTracker()
//                             }
//                         )
//                     }

//                     //Adds the name provided into the department table with a default id
                    
//                     if(accion === "Add Department") {
//                         employeeTracker()
//                         connection.query("INSERT INTO department SET ?", {
//                             name:answers.department
                            
//                         })
//                     }

//                     // const dept_Id = departmentArray.filter(department => department.name === answers.roleDepartment) [0].department_id.id; PRUEBA AHORITA REGRESO A ELLA
//                     if(accion === "Add Role") {
//                         employeeTracker()
//                         connection.query("INSERT INTO role SET ?", {
//                             title: answers.roleName,
//                             salary: answers.salary,
//                             department_id: dept_Id,
//                         })
//                     }

//                     if (accion === "Add Employee") {
//                         employeeTracker()
//                         connection.query("INSERT INTO employee SET ?", {
//                             first_name: answers.firstName,
//                             last_name: answers.lastName,
//                             // role_id
//                         })
//                     }

                    
                        
                    
        
//                 }); 
//             }      
//         }            
//     )  
// };       


employeeTracker()

