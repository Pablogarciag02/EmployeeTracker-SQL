const Department = require("./department");

class Role extends Department {
    constructor (id, title, salary, department_id) {
        super ()

        delete this.name
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }

    getRoleid() {
        return this.id
    }

    getTitle() {
        return this.title;
    }

    getSalary() {
        return this.salary;
    }

    getDepartment_id() {
        return this.department_id;
    }
 
}

let pablo = new Department (3, "Test")

let prueba = new Role ( 1, "titulo", "28,000", pablo.getId() );

console.log(prueba);

module.exports = Role;