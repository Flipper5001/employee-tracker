const { faker } = require('@faker-js/faker');
const { addDepartments } = require('../scripts/department');
const { addEmployees } = require('../scripts/employee');
const { addRoles } = require('../scripts/role');


async function generateDepartments(){
    for (let index = 0; index < 4; index++) {
        await addDepartments(faker.commerce.department())          
    }
}

async function generateRoles(){
    for (let index = 0; index < 8; index++) {
        const jobType = faker.name.jobType()
        const salary = faker.finance.amount(0, 100000, 0)
        const department = faker.finance.amount(1,4,0)
        await addRoles(jobType, salary, department)         
    }
}

async function generateEmployees(){
    for (let index = 0; index < 8; index++) {
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        const title = faker.finance.amount(1,8,0)
        await addEmployees(firstName, lastName, title, null)         
    }
}

async function seed(){
    await generateDepartments()
    await generateRoles()
    await generateEmployees()
}

seed()