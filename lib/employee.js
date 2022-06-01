const Role = require("./role");

class Employee extends Role {
    constructor (id, first_name, last_name, role_id){
        super()
        
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
    }

    getId() {
        return this.id;
    }

    getfirst_name() {
        return this.first_name;
    }

    getlast_name() {
        return this.last_name;
    }

    getRole() {
        return this.role_id;
    }
    
}

let jefe = new Employee(1, "pablo", "garcia", "FINANCELEAD")

let employee1 = new Employee(2, "luis", "garza", "finance" )

console.log(jefe);
console.log(employee1)