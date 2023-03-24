INSERT INTO departments (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal")
       ;

INSERT INTO roles (title, salary, department_id)
VALUES ("Salesperson", "80000", 1),
       ("Software Engineer", "100000", 2),
       ("Accountant", "100000", 3);
       
INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Bob", "Bee", 1),
       ("Joe", "Lee", 2),
       ("Sue", "Zee", 3)