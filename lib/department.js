class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }


    getId(){
        return this.id;
    }

    getName(){
        return this.name
    }
    
    
}

let pablo = new Department (3, "Test")

console.log(pablo)


module.exports = Department;