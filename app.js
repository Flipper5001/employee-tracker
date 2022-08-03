// Inquirer for options and selecting in command line
const inquirer = require('inquirer');
// functions created in scripts folder for easy of use and convenience, making app.js smaller and easier to understand
const { viewDepartments, addDepartments, deleteDepartment } = require('./scripts/department');
const { viewEmployees, addEmployees, answerEmployees, updateEmployees, updateManager, viewEmployeesByManager, viewEmployeesByDepartment, deleteEmployee } = require('./scripts/employee');
const { viewRoles, addRoles, answerRoles, deleteRoles } = require('./scripts/role');

// inquirer query from previous module 
const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'primary',
        choices: [
            'View all Employees',
            'View Employees by manager',
            'View Employees by department',
            'Add Employee',
            'Delete Employee',
            'Update an Employee Role',
            'Update an Employee Manager',
            'View all Roles',
            'Add Role',
            'Delete Role',
            'View all Departments',
            'Add Department',
            'Delete Departmet',
            'Quit',
        ]
    },
    {
        type: 'input',
        message: "What is the new Department's name?",
        name: 'department_name',
        when: (answer) => answer.primary === 'Add Department',
    },
    {
        type: 'input',
        message: "What is the name of the role?",
        name: 'role_name',
        when: (answer) => answer.primary === 'Add Role',
    },
    {
        type: 'input',
        message: "What is the salary of the role?",
        name: 'salary',
        when: (answer) => answer.primary === 'Add Role',
    },
    {
        type: 'list',
        message: "Which department does the role belong to?",
        name: 'department_id',
        choices: async () => {
            const departments = await viewDepartments();
            return departments.map((department) => {
                return {
                    name: department.name,
                    value: department.id
                }
            })
        },
        when: (answer) => answer.primary === 'Add Role',
    },
    {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'first_name',
        when: (answer) => answer.primary === 'Add Employee',
    },
    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'last_name',
        when: (answer) => answer.primary === 'Add Employee',
    },
    {
        type: 'list',
        message: "What is the employee's role?",
        name: 'employee_role',
        choices: async () => {
            const roles = await answerRoles();
            return roles.map((role) => {
                return {
                    name: role.title,
                    value: role.id
                }
            })
        },
        when: (answer) => answer.primary === 'Add Employee',
    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        name: 'manager',
        choices: async () => {
            const employees = await answerEmployees();
            return employees.map((employee) => {
                return {
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                }
            })
        },
        when: (answer) => answer.primary === 'Add Employee',
    },
    {
        type: 'list',
        message: "Which employee's role do you want to update?",
        name: 'update_employee_role',
        choices: async () => {
            const employees = await answerEmployees();
            return employees.map((employee) => {
                return {
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                }
            })
        },
        when: (answer) => answer.primary === 'Update an Employee Role',
    },
    {
        type: 'list',
        message: "Which role do you want to assign the selected employee?",
        name: 'update_role',
        choices: async () => {
            const roles = await answerRoles();
            return roles.map((role) => {
                return {
                    name: role.title,
                    value: role.id,
                }
            })
        },
        when: (answer) => answer.primary === 'Update an Employee Role',
    },
    {
        type: 'list',
        message: "Which employee do you want to update?",
        name: 'update_employee_manager',
        choices: async () => {
            const employees = await answerEmployees();
            return employees.map((employee) => {
                return {
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                }
            })
        },
        when: (answer) => answer.primary === 'Update an Employee Manager',
    },
    {
        type: 'list',
        message: "Which manager should be assigned to this employee?",
        name: 'update_manager',
        choices: async () => {
            const employees = await answerEmployees();
            return employees.map((employee) => {
                return {
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                }
            })
        },
        when: (answer) => answer.primary === 'Update an Employee Manager',
    },
    {
        type: 'list',
        message: "Which departent do you want to delete?",
        name: 'delete_department',
        choices: async () => {
            const departments = await viewDepartments();
            return departments.map((department) => {
                return {
                    name: department.name,
                    value: department.id
                }
            })
        },
        when: (answer) => answer.primary === 'Delete Departmet',
    },
    {
        type: 'list',
        message: "Which employee do you want to delete?",
        name: 'delete_employee',
        choices: async () => {
            const employees = await answerEmployees();
            return employees.map((employee) => {
                return {
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                }
            })
        },
        when: (answer) => answer.primary === 'Delete Employee',
    },
    {
        type: 'list',
        message: "Which role do you want to delete?",
        name: 'delete_role',
        choices: async () => {
            const roles = await answerRoles();
            return roles.map((role) => {
                return {
                    name: role.title,
                    value: role.id,
                }
            })
        },
        when: (answer) => answer.primary === 'Delete Role',
    },
]

function employeeTracker() {
    return inquirer.prompt(questions)
    .then(async (answer) => {
        // utilise witch instead of if else statements for this kind of operation
        switch(answer.primary){
            case 'View all Employees':
                const employees = await viewEmployees();
                console.table(employees);
                break;
            case 'View Employees by manager':
                const byManager = await viewEmployeesByManager();
                console.table(byManager);
                break;
            case 'View Employees by department':
                const byDepartment = await viewEmployeesByDepartment()
                console.table(byDepartment);
                break;
            case 'Add Employee':
                await addEmployees(answer.first_name, answer.last_name, answer.employee_role, answer.manager);
                console.log(`${answer.first_name}` + ' ' + `${answer.last_name} has been added to the Database`)
                break;
            case 'Delete Employee':
                await deleteEmployee(answer.delete_employee)
                console.log('Employee has been deleted')
                break;
            case 'Update an Employee Role':
                await updateEmployees(answer.update_employee_role, answer.update_role);
                console.log(`Employee's role has been updated`)
                break;
            case 'Update an Employee Manager':
                await updateManager(answer.update_employee_manager, answer.update_manager)
                console.log(`Employee's manager has been updated`)
                break;
            case 'View all Roles':
                const roles = await viewRoles();
                console.table(roles);
                break;
            case 'Add Role':
                await addRoles(answer.role_name, answer.salary, answer.department_id);
                console.log(`${answer.role_name} has been added to the Database`)
                break;
            case 'Delete Role':
                await deleteRoles(answer.delete_role)
                console.log('Role has been deleted')
                break;
            case 'View all Departments':
                const departments = await viewDepartments();
                console.table(departments);
                break;
            case 'Add Department':
                await addDepartments(answer.department_name);
                console.log(`${answer.department_name} has been added to the Database`)
                break;
            case 'Delete Departmet':
                await deleteDepartment(answer.delete_department)
                console.log('Department has been deleted')
                break;
            case 'Quit':
                process.exit(0);
        }
        // repeat function when case is completed
        await employeeTracker()
    })
}

// initialise
employeeTracker()
