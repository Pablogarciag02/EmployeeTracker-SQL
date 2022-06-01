
// const connection = require("../conection")
const queries = {
    allEmployees:`SELECT e.id, e.first_name, e.last_name, title, name AS department, salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    INNER JOIN role
    ON e.role_id = role.id
    INNER JOIN department
    ON role.department_id = department.id
    LEFT JOIN employee m
    ON e.manager_id = m.id;`,

    allRoles:`SELECT role.id, title, salary, name AS department
    FROM role
    INNER JOIN department
    ON role.department_id = department.id;`,

    allDepartments:`SELECT id, name AS department
    FROM department;`,

    departmentArray: `SELECT * FROM department.name`
}

module.exports = queries;