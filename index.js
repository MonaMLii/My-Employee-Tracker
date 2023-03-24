const inquirer = require('inquirer');
const allEmployee = [];

const addItem = () => {
    inquirer
        .prompt([

            {
                type: 'list',
                name: 'add',
                message: 'What would you like to do?',
                choices: ["Add Department", "Add Role", "Add Employee"]
            },
        
        ])
        .then((data) => {
            if (data.add === "Add Department") {
                addDepartment();
            } else if (data.add === "Add Role") {
                addRole();
            } else {
                addEmployee();
            }
            
        })
}

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'What is the name of the department?',
            }          
        ])
        .then ((data) => {
            
            db.query(data.department, )
        })
};
const addRole = () => {
    inquirer
        .prompt([

            {
                type: 'input',
                name: 'role',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this role?'
            },
            {
                type: 'input',
                name: 'department',
                message: 'What department does the role belong to?'
            }
        ]);
};
const addEmployee = () => {
    inquirer
        .prompt([

            {
                type: 'input',
                name: 'firstname',
                message: 'What is employee first name?',
            },
            {
                type: 'input',
                name: 'lastname',
                message: 'What is employee last name?',
            },
            {
                type: 'input',
                name: 'role',
                message: 'What is the role of this employee?'
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Who is the manager of the employee?',
            }
        ]);
}
addItem();

