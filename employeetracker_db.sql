CREATE DATABASE employeetracker_db;

USE employeetracker_db;

CREATE TABLE department(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(30)
);

CREATE TABLE role(
id INT,
title VARCHAR (30),
salary DECIMAL,
deparment_id INT
);

CREATE TABLE employee(
id INT,
first_name VARCHAR (30),
last_name VARCHAR(30),
role_id INT,
manager_id INT
);


