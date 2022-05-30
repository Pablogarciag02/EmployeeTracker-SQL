USE employeetracker_db

INSERT INTO department (name)
VALUES ("Sales"), ("Finance"), ("Legal"), ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Salesperson", 80000, 1), ("Lead Engineer", 150000, 4), ("Software Engineer", 120000, 4), ("Account Manager", 160000, 2), ("Accountant", 125000, 2), ("Legal Team Lead", 250000, 3), ("Lawyer", 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ale", "Peña", 1, 1), ("Pablo", "Garcia", 2, null), ("Mario", "Villarreal", 3, 3), ("Luis", "Garza", 4, null), ("Diego", "Reyes", 5, 5), ("Ana", "Isabel", 6, null), ("Fabrice", "Serfatti", 7, 7), ("Raul", "Garcia", 8, null);


