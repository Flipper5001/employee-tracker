// functions created in scripts folder for easy of use and convenience, making app.js smaller and easier to understand

const { connect } = require("../db/connect");

const viewEmployeesString = 
`select e.id, e.first_name, e.last_name, roles.title, departments.name as department, roles.salary, concat(m.first_name,' ', m.last_name) as manager from employees e
inner join roles on roles.id=e.role_id
inner join departments on roles.department_id = departments.id
left join employee_cms.employees m on e.manager_id = m.id`

async function viewEmployees(){
  const database = await connect();
  const [employees] = await database.query(viewEmployeesString + ' ' + `ORDER BY id`);
  return employees;
}

async function viewEmployeesByManager(){
  const database = await connect();
  const [employees] = await database.query(viewEmployeesString + ' ' + `ORDER BY manager`)
  return employees;
}

async function viewEmployeesByDepartment(){
  const database = await connect();
  const [employees] = await database.query(viewEmployeesString + ' ' + `ORDER BY department`)
  return employees;
}

async function answerEmployees(){
  const database = await connect();
  const [employees] = await database.query('SELECT * FROM employees ORDER BY id')
  return employees;
}

async function addEmployees(firstName, lastName, title, manager_id){
  const database = await connect();
  await database.query('INSERT INTO `employee_cms`.`employees` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES (?, ?, ?, ?)', [firstName, lastName, title, manager_id])
}

async function updateEmployees(employee_id, role_id){
  const database = await connect();
  await database.query(`UPDATE employees SET role_id = ? WHERE id = ?;`,[role_id, employee_id])
}

async function updateManager(employee_id, manager_id){
  const database = await connect();
  await database.query(`UPDATE employees SET manager_id = ? WHERE id = ?;`, [manager_id, employee_id])
}

async function deleteEmployee(id){
  const database = await connect();
  await database.query('DELETE FROM employees WHERE id = ?',id);
}

module.exports = {
    viewEmployees,
    addEmployees,
    updateEmployees,
    answerEmployees,
    updateManager,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    deleteEmployee,
}

// without promise in require (function needs to be async and await for connection prior as opposed to this method)

// function viewEmployees(){
//     const employees = connect.promise().query(`SELECT * FROM employees`);
//     return employees;
// }