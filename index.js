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
        'SELECT role.id, role.title, role.salary, department.name AS department FROM `role` INNER JOIN department ON role.department_id = department.id', 
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
    return inquirer.prompt ([
        {
            type: "input",
            name:"department",
            message: "Please enter the name for the new Department.",
            validate: department => {
                if(department) {
                    return true;
                } else {
                    return false;
                }

            }
        },
    ])
    .then((answers) => {
        connection.query("INSERT INTO department SET ?", {
            name:answers.department,                  
        }) 
        console.log("Succsesfully Added Department") 
        employeeTracker()
    })
}

addRole = () => {
    connection.execute("SELECT * FROM department",  (err, results) => {
        const departmentArray = results.map(d => {
            return d
            
        })    
        console.log(departmentArray)
        return inquirer.prompt ([
            {
                type: "input",
                name: "roleName",
                message: "What is the name of the role?",
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
            },
            
            
            {
                type: "list",
                name: "roleDepartment",
                choices: departmentArray,
                message:"What department does the role belong to?",
            },
        ])
        .then((answers) => {
            const departmentId = departmentArray.filter(department => department.name === answers.roleDepartment)[0].id;

            connection.query("INSERT INTO role SET ?", {
                title: answers.roleName,
                salary: answers.salary,
                department_id: departmentId,
            })
            console.log("Succsesfully Added Role") 
            employeeTracker()
        })
        
    })
}

addEmployee = () => {
    connection.execute("SELECT role.id AS id, title AS name FROM role", (err, results) => {
        const roleArray = results.map(r => {
            return r
        })
        console.log(roleArray)
        
        return inquirer.prompt ([
            {
                type: "input",
                name: "firstName",
                message: "What is the first name of the employee?",
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the last name of the employee?",
            },
            {
                type: "list", 
                name: "employeeRole",
                message: "What is the role for the employee?",
                choices: roleArray,
            }
            // {
            //     type: "list", 
            //     name: "employeeManager",
            //     message: "Who is the employees manager?",
            //     choices: managerArray,
            // },
        ])
        .then((answers) => {
            const roleId = roleArray.filter(role => role.name === answers.employeeRole)[0].id;
            console.log(roleId)
            employeeTracker()
            connection.query("INSERT INTO employee SET ?", {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: roleId,
                manager_id: null
            })
            
        })
    })
};



employeeTracker()

