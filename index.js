//import inquirer and mysql2
const inquirer = require('inquirer');
const mysql = require('mysql2');
//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeeManager_db'
    },
    console.log(`Connection to employeeManager_db database.`)
);

// initial question
const addItem = () => {
    inquirer
        .prompt([

            {
                type: 'list',
                name: 'init',
                message: 'What would you like to do?',
                choices: ["Add Department", "Add Role", "Add Employee", "View Depqartments",
                    "View Roles", "View Employees", "Update Employee Role", "Delete Department", 
                    "Delete Role", "Delete Employee", "Nothing"]
            },

        ])
        .then((data) => {
            switch (data.init) {
                case 'Add Department':
                    addDepartment();
                    break
                case 'Add Role':
                    addRole();
                    break
                case 'Add Employee':
                    addEmployee();
                    break
                case 'View Departments':
                    viewDepartments();
                    break
                case 'View Roles':
                    viewRoles();
                    break
                case 'View Employees':
                    viewEmployees();
                    break
                case 'Update Employee Role':
                    updateRole();
                    break
                case 'Delete Department':
                    deleteDepartment();
                    break
                case 'Delete Role':
                    deleteRole();
                    break
                case 'Delete Employee':
                    deleteEmployee();
                    break
                case "Nothing":
                    console.log('Have a great day!');
                    break
            }
        });
}

//start writing each function and add addItem() at the end

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department?',
            }
        ])
        .then((department) => {

            db.query('INSERT INTO departments SET ?', department, err => {
                if (err) { console.log(err) }
            })
            console.log('Department Succesfully Added!');
            addItem();
        })
};


const addRole = () => {
    inquirer
        .prompt([

            {
                type: 'input',
                name: 'title',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this role?'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'What is the id of the department of the role?'
            }
        ])
        .then((role) => {
            db.query('INSERT INTO roles SET ?', role, err => {
                if (err) { console.log(err) }
            })
            console.log('Role Succesfully Added!');
            addItem();
        })
};


const addEmployee = () => {
    inquirer
        .prompt([

            {
                type: 'input',
                name: 'first_name',
                message: 'What is employee first name?',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is employee last name?',
            },
            {
                type: 'number',
                name: 'role_id',
                message: 'What is the role id of this employee?'
            },
            {
                type: 'list',
                name: 'managerBoolean',
                message: 'Is the employee a manager?',
                choices: ['Yes', 'No']
            }
        ])
        .then((employee) => {
            console.log(employee);
            if (employee.managerBoolean === 'Yes') {
                delete employee.managerBoolean
            
                db.query('INSERT INTO employees SET ?', employee, err => {
                    if (err) { console.log(err) }
                    console.log(employee, "this is employee")
                })
                console.log('Employee Succesfully Added!')
                addItem();
            } else if (employee.managerBoolean === 'No') {
                inquirer
                    .prompt([{
                    type: 'input',
                    name: 'manager_id',
                    message:'What is the id of the manager of the employee?'
                }])
                .then(subordinate => {
                    delete employee.managerBoolean

                    let newEmployee = {
                       ...employee,
                       ...subordinate,
                    }
                    db.query('INSERT INTO employees SET ?', newEmployee, err => {
                        if (err) { console.log(err) }
                    })
                    console.log('Employee Succesfully Added!');
                    addItem();
                })
            }
        })
};

const updateRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'id',
                message: 'What is the id of the employee would you like to update?',
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the id of the role that the employee should be update to?',
            }
        ])
        .then((employee) => {

            let newRole = {
               role_id: employee.role_id 
            }

            db.query(`UPDATE employees SET ? WHERE id = ${employee.id}`, newRole, err => {
                if (err) { console.log(err) }
            })
            console.log('Department Succesfully Updated!');
            addItem();
        })
};

const viewDepartments = () => {
    db.query('SELECT * FROM departments', (err, departments ) => {
        if (err) {
            console.log(err);
        }
        console.table(departments);
    })
    addItem();
};

const viewRoles = () => {
    db.query('SELECT * FROM roles', (err, roles ) => {
        if (err) {
            console.log(err);
        }
        console.table(roles);
        
    })
    addItem();
};


const viewEmployees = () => {
    db.query('SELECT * FROM employees', (err, employees ) => {
        if (err) {
            console.log(err);
        }
        console.table(employees);
    })
    addItem();
};

const deleteDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Which department would you like to delete?',
            },
        ])
        .then((department) => {

            db.query(`DELETE departments SET ? WHERE id = ${department.name}`, department, err => {
                if (err) { console.log(err) }
            })
            console.log('Department Succesfully Deleted!');
            addItem();
        })
};

const deleteRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What role would you like to delete?',
            },
        ])
        .then((role) => {
            db.query(`DELETE roles SET ? WHERE id = ${role.title}`, role, err => {
                if (err) { console.log(err) }
            })
            console.log('Role Succesfully Deleted!');
            addItem();
        })
};

const deleteEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the employee that you would like to delete?',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the last name of the employee that you would like to delete?',
            },
        ])
        .then((employee) => {

            db.query(`DELETE employees SET ? WHERE first_name = ${employee.first_name} AND last_name = ${employee.last_name}`, employee, err => {
                if (err) { console.log(err) }
            })
            console.log('Employee Succesfully Deleted!');
            addItem();
        })
};


addItem();

