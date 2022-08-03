// functions created in scripts folder for easy of use and convenience, making app.js smaller and easier to understand

const { connect } = require("../db/connect");

async function viewRoles(){
    const database = await connect();
    const [roles] = await database.query(`
    SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles 
    INNER JOIN departments ON departments.id = roles.department_id
    ORDER BY id`)
    return roles;
}

async function answerRoles(){
    const database = await connect();
    const [roles] = await database.query('SELECT * FROM roles ORDER BY id')
    return roles;
}

async function addRoles(role, salary, department_id){
    const database = await connect();
    await database.query(`INSERT INTO employee_cms.roles (title, salary, department_id) VALUES ('${role}', '${salary}', '${department_id}')`)
}

async function deleteRoles(id){
    const database = await connect();
    await database.query('DELETE FROM roles WHERE id = ?',id);
}

module.exports ={
    viewRoles,
    addRoles,
    answerRoles,
    deleteRoles,
}

// without promise in require (function needs to be async and await for connection prior as opposed to this method)

// function viewRoles(){
//     const roles = connect.promise().query(`SELECT * FROM roles`);
//     return roles;
// }

// INNER JOIN roles ON employee_cms.departments = roles.department_id