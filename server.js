//Imports
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
require('dotenv').config()

//Create Connection instance variable
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) throw err;
  console.log('connected as id' + connection.threadId)
  promptUser();
})

//Inquirer Prompt 
const promptUser = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choices',
      message: 'What would you like to do?',
      choices: ['View all Departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Update an employee manager',
        "View employees by department",
        'Delete a department',
        'Delete a role',
        'Delete an employee',
        'View department budgets',
        'No Action']
    }
  ])
    .then((answers) => {
      // const { choices } = answers;

      //massive switch statement because if-> else chain would be too much.
      switch (answers.choices) {
          case 'View all Departments':
              showDepartments();
              break;
          case 'View all roles':
              showRoles();
              break;
          case 'View all employees':
              showEmployees();
              break;
          case 'Add a department':
              addDepartment();
              break;
          case 'Add a role':
              addRole();
              break;
          case 'Add an employee':
              addEmployee();
              break;
          case 'Update an employee role':
              updateEmployee();
              break;
          case 'Update an employee manager':
              updateManager();
              break;
          case 'View employees by department':
              employeeDepartment();
              break;
          case 'Delete a department':
              deleteDepartment();
              break;
          case 'Delete a role':
              deleteRole();
              break;
          case 'Delete an employee':
              deleteEmployee();
              break;
          case 'View department budgets':
              viewBudget();
              break;
          case 'No Action':
              connection.end();
              break;
      }
      
    })
};

//Function that pulls all departments and logs them in a table, in the console.

showDepartments = () => {
  console.log('Showing all departments...');
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};


showRoles = () => {
  console.log('Showing all roles...');

  const sql = `SELECT role.id, role.title, department.name AS department
                 FROM role
                 INNER JOIN department ON role.department_id = department.id`;

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  })
};

showEmployees = () => {
  console.log('Showing all Employees...');

  const sql = `SELECT employee.id, employee.first_name, employee.last_name, manager_id
              FROM employee`

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  })
};

addDepartment = () => {

};

addRole = () => {

};

addEmployee = () => {

}

updateEmployee = () => {

};

employeeDepartment = () => {
  
}
