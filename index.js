const inquirer = require("inquirer");
const mysql = require ("mysql2");
const consoleTable = require("console.table");

const connection = require("./connection/connection");
const { query, promise } = require("./connection/connection");

//Will execute when the conection is established to the server. imported from connection.js
connectionEstablished = () => {
   console.log("  /$$$$$$$$                         /$$                                               /$$$$$$$$                           /$$                           ")
   console.log(" | $$_____/                        | $$                                              |__  $$__/                          | $$                           ")
   console.log(" | $$       /$$$$$$/$$$$   /$$$$$$ | $$  /$$$$$$  /$$   /$$  /$$$$$$   /$$$$$$          | $$  /$$$$$$  /$$$$$$   /$$$$$$$| $$   /$$  /$$$$$$   /$$$$$$  ")
   console.log(" | $$$$$   | $$_  $$_  $$ /$$__  $$| $$ /$$__  $$| $$  | $$ /$$__  $$ /$$__  $$         | $$ /$$__  $$|____  $$ /$$_____/| $$  /$$/ /$$__  $$ /$$__  $$ ")
   console.log(" | $$__/   | $$ \ $$ \ $$| $$  \ $$| $$| $$  \$$ | $$ | $$|       $$$$$$$$| $$$$$$$$        | $$| $$  \__/ /$$$$$$$| $$       | $$$$$$/ | $$$$$$$$| $$  \__/ ")
   console.log(" | $$      | $$ | $$ | $$| $$  | $$| $$| $$  | $$| $$  | $$| $$_____/| $$_____/         | $$| $$      /$$__  $$| $$      | $$_  $$ | $$_____/| $$       ")
   console.log(" | $$$$$$$$| $$ | $$ | $$| $$$$$$$/| $$|  $$$$$$/|  $$$$$$$|  $$$$$$$|  $$$$$$$         | $$| $$     |  $$$$$$$|  $$$$$$$| $$ \  $$ |  $$$$$$$| $$       ")
   console.log(" |________/|__/ |__/ |__/| $$____/ |__/ \______/  \____  $$ \_______/ \_______/             |__/|__/      \_______/ \_______/  |__/  \__/ \_______/  |__/       ")
   console.log("                         | $$                     /$$| $$                                                                                              ")
   console.log("                         | $$                    |  $$$$$$/                                                                                             ")
   console.log("                         |__/                     \______/                                                                                              ")
   employeeTracker();
}

//Returns a prompt that contains one array with all the answers
const employeeTracker = () => {
    return inquirer.prompt ([
        {
            type: "list",
            name: "accion",
            message: "Please Select an Option",
            choices:["All Departments", "All Roles", "All Employees", "Add Department", "Add Role", "Add Employee", "Update An Employee Role", "Delete An Employee", "Delete A Department", "Delete A Role"]
        },
    ])   
    //Each answer return a function 
    .then((answers) => {
        let {accion} = answers;
                    
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

        if(accion === "Delete An Employee") {
           deleteEmployee()
        }

        if(accion === "Delete A Department") {
            deleteDepartment()
        }

         if(accion === "Delete A Role") {
            deleteRole()
        }
    })
}

//Function that shows all departments
allDepartments = () => {
    connection.query(
        'SELECT id, name AS department FROM `department`', 
        function(err, results, fields) {
            console.table(results)
            employeeTracker()
        }
    )
};

//Function that shows all Roles
allRoles = () => {
    connection.query(
        'SELECT role.id, role.title, role.salary, department.name AS department FROM `role` INNER JOIN department ON role.department_id = department.id', 
        function(err, results, fields) {
            console.table(results)
            employeeTracker()
        }
    )
}

//Function that shows all Employees
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

//Function that adds departments
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

//Function that adds Role
addRole = () => {
    connection.execute("SELECT * FROM department",  (err, results) => {
        const departmentArray = results.map(d => {
            return d
            
        })    

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
            //Gets the id of the department through the name of the department
            const departmentId = departmentArray.filter(department => department.name === answers.roleDepartment)[0].id;

            //Inserts answers into role table, department id adds the id of the department to the table
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

//Function that adds Employee
addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of the employee?",
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the last name of the employee?",
        }
    ])
    //Creates an array called employee info and adds the first and last name provided
    .then(answers => {
        const employeeInfo = [answers.firstName, answers.lastName]

        const role = "SELECT role.id, role.title AS name FROM role";

        //Creates an array that will contain the id and the name of the roles
        connection.query(role, (err, results) => {
            if(err) throw err;
            const roleArray = results.map(({id, name}) => ({id: id, name: name}));
            
            inquirer.prompt([
                {
                    type: "list", 
                    name: "employeeRole",
                    message: "What is the role for the employee?",
                    choices: roleArray,
                }

            ])
            .then(answer => {
                const role = answer.employeeRole;
                //Grabs the role selected and gets its id so that it can be added to the table
                const departmentId = roleArray.filter(role => role.name === answer.employeeRole)[0].id;

                //Pushes the id from the role selected into the employee info array that contains first and last name
                employeeInfo.push(departmentId);

                const managerRole = "SELECT * FROM employee"
                
                //Gets all employees that are managers and selects their id and their full name and adds it into an array
                connection.query(managerRole, (err, results) => {
                    const managerArray = results.map(({id, first_name, last_name }) => ({id:id, name: first_name + " " + last_name}))

                    inquirer.prompt([
                        {
                            type: "list", 
                            name: "employeeManager",
                            message: "Who is the employees manager?",
                            choices: managerArray,
                        }
                    ])
                    .then(answer => {
                        //Grabs the manager selected and returns his id
                        const managerId = managerArray.filter(employee => employee.name === answer.employeeManager)[0].id;

                        //Pushes the managers id into the employee info so that it can be added to the employee table row
                        employeeInfo.push(managerId);

                        const rowEmployee = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)"
                        
                        connection.query (rowEmployee, employeeInfo, (err, result) => {
                            if (err) throw err;
                            console.log("Succsefully Added Employee")
                            employeeTracker()
                        })
    
                    });
                });
            })

            
        });
    });
};

//Function that Updates Employee
updateEmployee = ()  => {
    //Selects all info from employee
    const employeeTable = `SELECT * FROM employee`;

    connection.query(employeeTable, (err, results) => {
        if (err) throw err;
        //Gets id, and full name 
        const employees = results.map(({id, first_name, last_name }) => ({id:id, name: first_name + " " + last_name}))

        inquirer.prompt([
            {
            type: "list",
            name: "employeeName",
            message: "Which employee would you like to update?",
            choices: employees
            }
        ])
        .then(answer => {
            //Gets the id of the employee that was selected for update
            const employeeId = employees.filter(employee => employee.name === answer.employeeName)[0].id

            //Grabs role id and role title and renames it to name
            const roleTable = "SELECT role.id, role.title AS name FROM role";

            connection.query(roleTable, (err, results) => {
                if (err) throw err;

                //Maps the info that was recieved and makes an array that contains role id and role name
                const roles = results.map(({id, name}) => ({id: id, name: name}));

                inquirer.prompt([
                    {
                        type: "list",
                        name: "employeeRole",
                        message: "What new role would you like to add for this employee?",
                        choices: roles
                    }
                ])
                .then(answer => {
                    //Gets the role id from the role that was selected by name
                    const roleId = roles.filter(role => role.name === answer.employeeRole)[0].id;


                    //Updates the information using string literals.
                    connection.query(`UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId}`) 

                    console.log("Employee Succesfully Updated")
                    
                    employeeTracker()
                    
                })
            })
        })
    })

};  

//Function that Deletes Employee that is Selected
deleteEmployee = () => {
    const employeeTable = `SELECT * FROM employee`;

    connection.query(employeeTable, (err, results) => {
        if (err) throw err;

        const employees = results.map(({id, first_name, last_name }) => ({id:id, name: first_name + " " + last_name}))

        inquirer.prompt([
            {
            type: "list",
            name: "employeeName",
            message: "Which employee would you like to Delete?",
            choices: employees
            }
        ])
        .then(answer => {
            const employeeId = employees.filter(employee => employee.name === answer.employeeName)[0].id
        
            connection.query(`DELETE FROM employee WHERE id = ${employeeId}`)

            employeeTracker()
            
        })


    })    
}

//Function that Deletes the department that is selected
deleteDepartment = () => {
    const deparmtentTale = `SELECT * FROM department`;

    connection.query(deparmtentTale, (err, results) => {
        if (err) throw err;

        const departments = results.map(({id, name }) => ({id: id, name: name}))
        // console.log(employees)

        inquirer.prompt([
            {
            type: "list",
            name: "departmentChoice",
            message: "Which department would you like to Delete?",
            choices: departments
            }
        ])
        .then(answer => {
            const departmentId = departments.filter(department => department.name === answer.departmentChoice)[0].id
        
            connection.query(`DELETE FROM department WHERE id = ${departmentId}`)

            console.log("Succesfully Deleted the Department")

            employeeTracker()
            
        })


    })    
}

//Function that Deletes the role that is selected
deleteRole = () => {
    const roleTable = `SELECT role.id, role.title AS name FROM role`;

    connection.query(roleTable, (err, results) => {
        if (err) throw err;

        const roles = results.map(({id, name }) => ({id: id, name: name}))

        inquirer.prompt([
            {
            type: "list",
            name: "roleName",
            message: "Which role would you like to Delete?",
            choices: roles
            }
        ])
        .then(answer => {
            const roleId = roles.filter(role => role.name === answer.roleName)[0].id
        
            connection.query(`DELETE FROM role WHERE id = ${roleId}`)

            console.log("Succesfully Deleted Role from Database")

            employeeTracker()
            
        })


    })    
}



