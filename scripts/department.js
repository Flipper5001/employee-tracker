// functions created in scripts folder for easy of use and convenience, making app.js smaller and easier to understand

const { connect } = require("../db/connect");

async function viewDepartments(){
    const database = await connect();
    const [departments] = await database.query('SELECT * FROM departments ORDER BY id');
    return departments;
}

async function addDepartments(department){
    const database = await connect();
    await database.query('INSERT INTO `employee_cms`.`departments` (`name`) VALUES (?)', department);
}

async function deleteDepartment(id){
    const database = await connect();
    await database.query('DELETE FROM departments WHERE id = ?',id);
}

module.exports ={
    viewDepartments,
    addDepartments,
    deleteDepartment,
}

// without promise in require (function needs to be async and await for connection prior as opposed to this method)

// function viewDepartments(){
//     const departments = connect.promise().query(`SELECT * FROM departments`);
//     return departments;
// }